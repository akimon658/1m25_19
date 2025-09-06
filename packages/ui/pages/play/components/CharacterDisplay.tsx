import { useEffect } from "react"
import {
  characterImageStyleForPlay,
  textBoxStyle,
} from "../../home/components/tutorial.css.ts"
import { useAudioPlayer } from "../../home/hooks/useAudioPlayer.ts"
import type { Dialog } from "../lib/dialogs.ts"
import { characterDisplayStyle } from "./characterDisplay.css.ts"

type CharacterDisplayProps = {
  dialog: Dialog
}

export const CharacterDisplay = ({ dialog }: CharacterDisplayProps) => {
  const { playAudio } = useAudioPlayer()

  useEffect(() => {
    if (dialog.audioUrl) {
      playAudio(dialog.audioUrl)
    }
  }, [dialog.audioUrl, playAudio])

  return (
    // ダイアログ操作を妨げないように pointerEvents を none に設定
    <div className={characterDisplayStyle}>
      <img src={dialog.image} alt="" className={characterImageStyleForPlay} />
      <div className={textBoxStyle}>
        <p>{dialog.text}</p>
      </div>
    </div>
  )
}
