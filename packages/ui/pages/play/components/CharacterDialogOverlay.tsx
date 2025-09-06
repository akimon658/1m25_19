import { useEffect, useState } from "react"
import {
  characterImageStyleForPlay,
  textBoxStyle,
} from "../../home/components/tutorial.css.ts"
import { useAudioPlayer } from "../../home/hooks/useAudioPlayer.ts"
import type { Dialog } from "../lib/dialogs.ts"

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

type CharacterDialogOverlayProps = {
  dialogQueue: Dialog[]
  onEnd: () => void
}

export const CharacterDialogOverlay = (
  { dialogQueue, onEnd }: CharacterDialogOverlayProps,
) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentDialog = dialogQueue[currentIndex]

  const handleOverlayClick = () => {
    if (currentIndex < dialogQueue.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      onEnd()
    }
  }

  if (!currentDialog) {
    return null
  }

  return (
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
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        zIndex: 100,
      }}
      onClick={handleOverlayClick}
    >
      <img
        src={currentDialog.image}
        alt=""
        className={characterImageStyleForPlay}
      />
      <div className={textBoxStyle}>
        <TextWithVoice
          text={currentDialog.text}
          audioUrl={currentDialog.audioUrl}
        />
      </div>
    </div>
  )
}
