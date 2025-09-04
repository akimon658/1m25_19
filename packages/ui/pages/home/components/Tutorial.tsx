import { useEffect, useState } from "react"
import { type SubmitHandler } from "react-hook-form"
import audio1 from "../../../assets/tutorial001.wav"
import audio2 from "../../../assets/tutorial002.wav"
import audio3 from "../../../assets/tutorial003.wav"
import { Button } from "../../../components/Button.tsx"
import { useAudioPlayer } from "../hooks/useAudioPlayer.ts"
import { useAudioSynth } from "../hooks/useAudioSynth.ts"
import { type FormValues, NameInputDialog } from "./NameInputDialog.tsx"
import { tutorialWrapperStyle } from "./tutorial.css.ts"

type TextWithVoiceProps = {
  text: string
  audioUrl: string
}

const TextWithVoice = ({ text, audioUrl }: TextWithVoiceProps) => {
  const { playAudio } = useAudioPlayer()

  useEffect(() => {
    playAudio(audioUrl)
  }, [audioUrl])

  return <p>{text}</p>
}

const initialScenario = [
  { type: "start" },
  {
    type: "text",
    text: "？？？「こんなところに人が来るなんてめずらしいですね」",
    audioUrl: audio1,
  },
  {
    type: "text",
    text: "？？？「私は ゆめり。人々の記憶を紡ぐお手伝いをしています」",
    audioUrl: audio2,
  },
  {
    type: "text",
    text: "ゆめり「えっと……あなたのことはなんて呼べばいいですか？」",
    audioUrl: audio3,
    action: "nameInput", // このセリフの後に名前入力ダイアログを表示
  },
  {
    type: "text",
    text: "ゆめり「{playerName}さんで合ってますか？」",
    action: "nameConfirm", // このセリフの後に確認ボタンを表示
  },
  {
    type: "text",
    text: "ゆめり「{playerName}さん……変わった名前ですね」",
  },
  {
    type: "end",
  },
]

export const Tutorial = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [playerName, setPlayerName] = useState("")
  const [isNameInputDialogOpen, setIsNameInputDialogOpen] = useState(false)
  const [scenario, setScenario] = useState(initialScenario)
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
          return scene
        })
      )
      setIsNameInputDialogOpen(false)
      setScenarioIndex((prev) => prev + 1)
    },
  })

  const currentScene = scenario[scenarioIndex]

  // 画面クリックで進行するためのハンドラ
  const handleScreenClick = () => {
    // ダイアログ表示中や確認ボタン表示中は画面クリックでの進行を無効化
    if (isNameInputDialogOpen || currentScene?.action === "nameConfirm") {
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
    }
  }

  // 名前入力の決定処理
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setPlayerName(data.name)

    const readingName = data.reading.trim() || data.name
    const textsToSynth = scenario
      .filter((scene) => scene.text && scene.text.includes("{playerName}"))
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
  const getDisplayText = () => {
    if (!currentScene || !currentScene.text) {
      return ""
    }

    return currentScene.text.replace(/{playerName}/g, playerName)
  }

  if (currentScene.type === "end") {
    return <div>チュートリアル完了！</div>
  }

  if (currentScene?.type === "start") {
    return (
      <div>
        <p>音声が再生されます。音量にご注意ください。</p>
        <Button onClick={handleNext} variant="primary">始める</Button>
      </div>
    )
  }

  return (
    <div
      className={tutorialWrapperStyle}
      onClick={handleScreenClick}
    >
      <TextWithVoice
        text={getDisplayText()}
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

      <NameInputDialog
        open={isNameInputDialogOpen}
        onOpenChange={setIsNameInputDialogOpen}
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </div>
  )
}
