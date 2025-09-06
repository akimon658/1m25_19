import image4 from "../../../assets/yumeri4.png"
import image6 from "../../../assets/yumeri6.png"
import image7 from "../../../assets/yumeri7.png"
// TODO: 実際の音声ファイルをインポートしてください
// import clearPerfectAudio from "../../../assets/clear_perfect.wav"
// import clearNormalAudio from "../../../assets/clear_normal.wav"
// import stuckAudio1 from "../../../assets/stuck1.wav"

export type Dialog = {
  text: string
  image: string
  audioUrl?: string
}

export const clearDialogs: Record<"perfect" | "normal", Dialog> = {
  perfect: {
    text: "ゆめり「パーフェクトです！すごい！」",
    image: image7,
    audioUrl: "", // clearPerfectAudio
  },
  normal: {
    text: "ゆめり「クリアおめでとうございます！」",
    image: image4,
    audioUrl: "", // clearNormalAudio
  },
}

export const stuckDialogs: Dialog[] = [
  {
    text: "ゆめり「うーん、行き詰まりみたいですね…」",
    image: image6,
    audioUrl: "", // stuckAudio1
  },
]
