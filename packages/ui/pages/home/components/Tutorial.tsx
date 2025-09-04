import { type FormEvent, useState } from "react"
import audio1 from "../../../assets/tutorial001.wav"
import audio2 from "../../../assets/tutorial002.wav"
import audio3 from "../../../assets/tutorial003.wav"
import { useAudioPlayer } from "../hooks/useAudioPlayer.ts"
import { useAudioSynth } from "../hooks/useAudioSynth.ts"

// 初期シナリオデータ（audioUrlを追加）
const initialScenario = [
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
]

export const Tutorial = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [playerName, setPlayerName] = useState("")
  const [isNameInputMode, setIsNameInputMode] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [inputReadingValue, setInputReadingValue] = useState("")
  const [scenario, setScenario] = useState(initialScenario) // scenarioをstate化
  const { synth, isPending } = useAudioSynth({
    onSuccess: (data) => {
      setScenario((prev) =>
        prev.map((scene) => {
          if (scene.text && scene.text.includes("{playerName}")) {
            const replaced = scene.text.replace(
              /{playerName}/g,
              inputReadingValue || inputValue,
            )
            const match = replaced.match(/「([^」]*)」/)
            const synthText = match ? match[1] : replaced
            return { ...scene, audioUrl: data[synthText] }
          }
          return scene
        })
      )
      setIsNameInputMode(false)
      setScenarioIndex(scenarioIndex + 1)
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

  // 名前入力の決定処理（ここで全てのplayerNameを含むテキストを合成）
  const handleSubmitName = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === "") return
    const readingName = inputReadingValue.trim() || inputValue
    setPlayerName(inputValue)

    // playerNameを含むテキストを抽出・合成
    const textsToSynth = scenario
      .filter((scene) => scene.text && scene.text.includes("{playerName}"))
      .map((scene) => {
        const replaced = scene.text!.replace(/{playerName}/g, readingName)
        const match = replaced.match(/「([^」]*)」/)
        return match ? match[1] : replaced
      })

    if (textsToSynth.length > 0) {
      synth(textsToSynth)
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

  // シナリオが終了したか
  const isScenarioEnded = scenarioIndex >= scenario.length

  if (isScenarioEnded) {
    return <div>チュートリアル完了！</div>
  }

  if (isNameInputMode) {
    return (
      <form onSubmit={handleSubmitName}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="名前を入力"
        />
        <input
          type="text"
          value={inputReadingValue}
          onChange={(e) => setInputReadingValue(e.target.value)}
          placeholder="読み方（任意）"
        />
        <button type="submit" disabled={isPending}>
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
