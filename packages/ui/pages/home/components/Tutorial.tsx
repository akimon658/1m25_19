import { useEffect, useState } from "react"
import { type SubmitHandler } from "react-hook-form"
import type { Answer } from "../../../api/bindings.gen.ts"
import audio1 from "../../../assets/tutorial001.wav"
import audio2 from "../../../assets/tutorial002.wav"
import audio3 from "../../../assets/tutorial003.wav"
import audio4 from "../../../assets/tutorial004.wav"
import audio5 from "../../../assets/tutorial005.wav"
import audio6 from "../../../assets/tutorial006.wav"
import audio7 from "../../../assets/tutorial007.wav"
import audio8 from "../../../assets/tutorial008.wav"
import audio9 from "../../../assets/tutorial009.wav"
import image from "../../../assets/yumeri.jpg"
import { Button } from "../../../components/Button.tsx"
import { Play } from "../../play/Play.tsx"
import { useAudioPlayer } from "../hooks/useAudioPlayer.ts"
import { useAudioSynth } from "../hooks/useAudioSynth.ts"
import { useGenerateGraph } from "../hooks/useGenerateGraph.ts"
import { type FormValues, NameInputDialog } from "./NameInputDialog.tsx"
import {
  characterImageStyle,
  textBoxStyle,
  tutorialWrapperStyle,
} from "./tutorial.css.ts"

type TextWithVoiceProps = {
  text: string
  audioUrl?: string
}

const TextWithVoice = ({ text, audioUrl }: TextWithVoiceProps) => {
  const { playAudio } = useAudioPlayer()

  useEffect(() => {
    if (audioUrl) {
      playAudio(audioUrl)
    }
  }, [audioUrl])

  return <p>{text}</p>
}

const initialScenario = [
  { type: "start" },
  {
    type: "text",
    text: "？？？「こんなところに人が来るなんてめずらしいですね」",
    audioUrl: audio1,
    image,
  },
  {
    type: "text",
    text: "？？？「私は ゆめり。人々の記憶を紡ぐお手伝いをしています」",
    audioUrl: audio2,
    image,
  },
  {
    type: "text",
    text: "ゆめり「えっと……あなたのことはなんて呼べばいいですか？」",
    audioUrl: audio3,
    action: "nameInput", // このセリフの後に名前入力ダイアログを表示
    image,
  },
  {
    type: "text",
    text: "ゆめり「{playerName}さんで合ってますか？」",
    action: "nameConfirm", // このセリフの後に確認ボタンを表示
    image,
  },
  {
    type: "text",
    text: "ゆめり「{playerName}さん……変わった名前ですね」",
    image,
  },
  {
    type: "text",
    text:
      "ゆめり「ここで会ったのも何かの縁なので、よかったら私の仕事を手伝ってくれませんか？」",
    audioUrl: audio4,
    image,
  },
  {
    type: "text",
    text: "ゆめり「というか手伝ってください！」",
    audioUrl: audio5,
    image,
  },
  {
    type: "play",
    preScenario: [
      {
        type: "text",
        text: "ゆめり「光っている点はどこかの誰かの記憶の断片です」",
        audioUrl: audio6,
        image,
      },
      {
        type: "text",
        text: "ゆめり「すべての点を1回だけ通るように繋げてみてください」",
        audioUrl: audio7,
        image,
      },
    ],
    postScenario: [
      {
        type: "text",
        text: "ゆめり「ばっちりです！」",
        audioUrl: audio8,
        image,
      },
      {
        type: "text",
        text:
          "ゆめり「ただ繋げるだけでもいいんですけど、今みたいに1周して戻ってくる経路を見つけられると完璧です！」",
        audioUrl: audio9,
        image,
      },
      {
        type: "text",
        text:
          "ゆめり「それじゃあ、これからよろしくお願いしますね。{playerName}さん！」",
        image,
      },
    ],
  },
]

type PlaySceneState = "pre" | "playing" | "post"

export const Tutorial = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [playerName, setPlayerName] = useState("")
  const [isNameInputDialogOpen, setIsNameInputDialogOpen] = useState(false)
  const [scenario, setScenario] = useState(initialScenario)
  const [playSceneState, setPlaySceneState] = useState<PlaySceneState>("pre")
  const [subScenarioIndex, setSubScenarioIndex] = useState(0)
  const { synth, isPending } = useAudioSynth({
    onSuccess: (audioData, { context }) => {
      const readingName = context.readingName

      setScenario((prev) =>
        prev.map((scene) => {
          if (scene.text && scene.text.includes("{playerName}")) {
            const replaced = scene.text.replace(/{playerName}/g, readingName)
            const match = replaced.match(/「([^」]*)」/)
            const synthText = match ? match[1] : replaced

            return { ...scene, audioUrl: audioData[synthText] }
          }

          if (scene.type === "play") {
            const updateSubScenario = (
              subScenes: typeof scene.postScenario,
            ) => {
              if (!subScenes) return undefined
              return subScenes.map((subScene) => {
                if (subScene.text && subScene.text.includes("{playerName}")) {
                  const replaced = subScene.text.replace(
                    /{playerName}/g,
                    readingName,
                  )
                  const match = replaced.match(/「([^」]*)」/)
                  const synthText = match ? match[1] : replaced
                  return { ...subScene, audioUrl: audioData[synthText] }
                }
                return subScene
              })
            }

            return {
              ...scene,
              preScenario: updateSubScenario(scene.preScenario),
              postScenario: updateSubScenario(scene.postScenario),
            } as typeof scene
          }
          return scene
        })
      )
      setIsNameInputDialogOpen(false)
      setScenarioIndex((prev) => prev + 1)
    },
  })

  const { generateGraph } = useGenerateGraph()

  const currentScene = scenario[scenarioIndex]

  useEffect(() => {
    // メインシナリオが進んだら、サブシナリオの状態をリセット
    if (currentScene.type === "play") {
      setPlaySceneState("pre")
      setSubScenarioIndex(0)
    }
  }, [scenarioIndex, currentScene.type])

  const handleClear = (_answer: Answer) => {
    if (currentScene.type === "play") {
      setPlaySceneState("post")
      setSubScenarioIndex(0)
    }
  }

  // 画面クリックで進行するためのハンドラ
  const handleScreenClick = () => {
    // ダイアログ表示中や確認ボタン表示中、プレイ中は画面クリックでの進行を無効化
    if (
      isNameInputDialogOpen ||
      currentScene?.action === "nameConfirm" ||
      currentScene?.type === "play"
    ) {
      return
    }

    // 名前入力シーンの場合、ダイアログを開く
    if (currentScene?.action === "nameInput") {
      setIsNameInputDialogOpen(true)
      return // ここではシーンを進めない
    }

    // それ以外の場合は次のシーンへ
    handleNext()
  }

  // 次のシーンへ進む処理を簡略化
  const handleNext = () => {
    const nextIndex = scenarioIndex + 1

    if (nextIndex < scenario.length) {
      setScenarioIndex(nextIndex)
    } else {
      generateGraph()
    }
  }

  // 名前入力の決定処理
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setPlayerName(data.name)

    const readingName = data.reading.trim() || data.name
    const textsToSynth = scenario
      .flatMap((scene) => {
        if (scene.type === "play") {
          const pre = scene.preScenario?.filter((s) =>
            s.text?.includes("{playerName}")
          ) ?? []
          const post = scene.postScenario?.filter((s) =>
            s.text?.includes("{playerName}")
          ) ?? []
          return [...pre, ...post]
        }
        if (scene.text?.includes("{playerName}")) {
          return [scene]
        }
        return []
      })
      .map((scene) => {
        const replaced = scene.text!.replace(/{playerName}/g, readingName)
        const match = replaced.match(/「([^」]*)」/)
        return match ? match[1] : replaced
      })

    if (textsToSynth.length > 0) {
      synth({
        texts: textsToSynth,
        context: { readingName },
      })
    } else {
      throw new Error("音声合成するテキストがありません")
    }
  }

  // 名前を再入力する処理
  const handleRedoNameInput = () => {
    // action が 'nameInput' のシーンのインデックスを探して戻る
    const nameInputIndex = scenario.findIndex((s) => s.action === "nameInput")
    if (nameInputIndex !== -1) {
      setScenarioIndex(nameInputIndex)
    }
  }

  // 表示するテキストを生成
  const getDisplayText = (text?: string) => {
    if (!text) {
      return ""
    }

    return text.replace(/{playerName}/g, playerName)
  }

  if (currentScene?.type === "start") {
    return (
      <div>
        <p>音声が再生されます。音量にご注意ください。</p>
        <Button onClick={handleNext} variant="primary">始める</Button>
      </div>
    )
  }

  if (currentScene.type === "play") {
    const subScenario = playSceneState === "pre"
      ? currentScene.preScenario
      : currentScene.postScenario

    const currentSubScene = subScenario?.[subScenarioIndex]
    const showOverlay = playSceneState !== "playing" && currentSubScene

    const handleOverlayClick = () => {
      if (playSceneState === "pre") {
        if (
          currentScene.preScenario &&
          subScenarioIndex < currentScene.preScenario.length - 1
        ) {
          setSubScenarioIndex((prev) => prev + 1)
        } else {
          setPlaySceneState("playing")
        }
      } else if (playSceneState === "post") {
        if (
          currentScene.postScenario &&
          subScenarioIndex < currentScene.postScenario.length - 1
        ) {
          setSubScenarioIndex((prev) => prev + 1)
        } else {
          handleNext() // メインシナリオを進める
        }
      }
    }

    return (
      <div style={{ position: "relative", width: "100dvw", height: "100dvh" }}>
        <Play
          graphId={1}
          onClear={handleClear}
          isTutorial
        />
        {showOverlay && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              cursor: "pointer",
            }}
            onClick={handleOverlayClick}
          >
            {currentSubScene.image && (
              <img
                src={currentSubScene.image as string}
                alt=""
                className={characterImageStyle}
              />
            )}
            <div className={textBoxStyle}>
              <TextWithVoice
                text={getDisplayText(currentSubScene.text)}
                audioUrl={"audioUrl" in currentSubScene
                  ? currentSubScene.audioUrl as string
                  : undefined}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={tutorialWrapperStyle}
      onClick={handleScreenClick}
    >
      {currentScene?.image && (
        <img
          src={currentScene.image as string}
          alt=""
          className={characterImageStyle}
        />
      )}
      <div className={textBoxStyle}>
        <TextWithVoice
          text={getDisplayText(currentScene?.text)}
          audioUrl={currentScene?.audioUrl}
        />

        {currentScene?.action === "nameConfirm"
          ? (
            <div onClick={(e) => e.stopPropagation()}>
              <Button type="button" onClick={handleNext} variant="primary">
                はい
              </Button>
              <Button type="button" onClick={handleRedoNameInput}>
                いいえ
              </Button>
            </div>
          )
          : null}
      </div>

      <NameInputDialog
        open={isNameInputDialogOpen}
        onOpenChange={setIsNameInputDialogOpen}
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </div>
  )
}
