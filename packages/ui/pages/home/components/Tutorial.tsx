import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import audio1 from "../../../assets/tutorial001.wav"
import audio2 from "../../../assets/tutorial002.wav"
import audio3 from "../../../assets/tutorial003.wav"
import { useAudioPlayer } from "../hooks/useAudioPlayer.ts"
import { useAudioSynth } from "../hooks/useAudioSynth.ts"

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
    text: "ゆめり「えっと……あなたのことはなんと呼べばいいですか？」",
    audioUrl: audio3,
  },
  { type: "nameInput" },
  {
    type: "nameConfirm",
    text: "ゆめり「{playerName}さんで合ってますか？」",
  },
  {
    type: "text",
    text: "ゆめり「{playerName}さん……変わった名前ですね」",
  },
  {
    type: "end",
  },
]

type FormValues = {
  name: string
  reading: string
}

export const Tutorial = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [playerName, setPlayerName] = useState("")
  const [isNameInputMode, setIsNameInputMode] = useState(false)
  const [scenario, setScenario] = useState(initialScenario)
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>()
  const { synth, isPending } = useAudioSynth({
    onSuccess: (audioData, { context }) => {
      // contextから読み方を取得
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
      setIsNameInputMode(false)
      setScenarioIndex((prev) => prev + 1)
    },
  })
  const { playAudio } = useAudioPlayer()

  const currentScene = scenario[scenarioIndex]

  // 次のシーンへ進む処理
  const handleNext = () => {
    const nextIndex = scenarioIndex + 1
    if (nextIndex <= scenario.length) {
      if (nextIndex < scenario.length) {
        const nextScene = scenario[nextIndex]
        if (nextScene.type === "nameInput") {
          setIsNameInputMode(true)
        }
      }
      setScenarioIndex(nextIndex)
    }
  }

  // 名前入力の決定処理
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setPlayerName(data.name)

    const readingName = data.reading.trim() || data.name
    // playerNameを含むテキストを抽出・合成
    const textsToSynth = scenario
      .filter((scene) => scene.text && scene.text.includes("{playerName}"))
      .map((scene) => {
        const replaced = scene.text!.replace(/{playerName}/g, readingName)
        const match = replaced.match(/「([^」]*)」/)
        return match ? match[1] : replaced
      })

    if (textsToSynth.length > 0) {
      // synth呼び出し時にコンテキストを渡す
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
    setIsNameInputMode(true)
    // nameInputシーンのインデックスを探して戻る
    const nameInputIndex = scenario.findIndex((s) => s.type === "nameInput")
    if (nameInputIndex !== -1) {
      setScenarioIndex(nameInputIndex)
    }
  }

  // 表示するテキストを生成
  const getDisplayText = () => {
    if (!currentScene || !currentScene.text) {
      return ""
    }

    if (currentScene.audioUrl) {
      playAudio(currentScene.audioUrl)
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
        <button type="button" onClick={handleNext}>
          始める
        </button>
      </div>
    )
  }

  if (isNameInputMode) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="名前を入力"
        />
        <input
          type="text"
          {...register("reading")}
          placeholder="読み方（任意）"
        />
        <button type="submit" disabled={isPending || !isValid}>
          {isPending ? "生成中..." : "決定"}
        </button>
      </form>
    )
  }

  if (currentScene?.type === "nameConfirm") {
    return (
      <div>
        <p>{getDisplayText()}</p>
        <button type="button" onClick={handleNext}>はい</button>
        <button type="button" onClick={handleRedoNameInput}>いいえ</button>
      </div>
    )
  }

  return (
    <div>
      <p>{getDisplayText()}</p>
      <button type="button" onClick={handleNext}>次へ</button>
    </div>
  )
}
