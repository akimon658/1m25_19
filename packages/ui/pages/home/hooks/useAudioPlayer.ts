import { useCallback, useRef } from "react"

export const useAudioPlayer = () => {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  const stopCurrentAudio = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current.currentTime = 0
      currentAudioRef.current = null
    }
  }, [])

  const playAudio = useCallback((url: string) => {
    stopCurrentAudio()
    const audio = new Audio(url)
    currentAudioRef.current = audio
    audio.play()
  }, [stopCurrentAudio])

  return { playAudio }
}
