import { type FormEvent, useState } from "react"

// シナリオデータ
const scenario = [
  {
    type: "text",
    text: "？？？「こんなところに人が来るなんてめずらしいですね」",
  },
  {
    type: "text",
    text: "？？？「私は ゆめり。人々の記憶を紡ぐお手伝いをしています」",
  },
  {
    type: "text",
    text: "ゆめり「えっと……あなたのことはなんと呼べばいいですか？」",
  },
  { type: "nameInput" },
  {
    type: "nameConfirm",
    text: "ゆめり「{playerName}さん、で合ってますか？」",
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
  const handleSubmitName = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === "") return
    setPlayerName(inputValue)
    setIsNameInputMode(false)
    setScenarioIndex(scenarioIndex + 1) // 確認シーンへ進む
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
        <button type="submit">決定</button>
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
