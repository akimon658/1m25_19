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

export const clearDialogs = {
  perfect: [
    {
      text:
        "ゆめり「パーフェクトです！すごい！記憶の繋がりがはっきり見えました！」",
      image: image7,
      audioUrl: "", // clearPerfectAudio
    },
    {
      text: "ゆめり「完璧な記憶の道筋…！お見事です！」",
      image: image7,
      audioUrl: "",
    },
    {
      text: "ゆめり「パーフェクト！これぞ理想的な解法ですね！」",
      image: image7,
      audioUrl: "",
    },
  ],
  normal: {
    fast: [
      {
        text:
          "ゆめり「クリアおめでとうございます！とってもスムーズでしたね！」",
        image: image4,
        audioUrl: "", // clearNormalAudio
      },
      {
        text: "ゆめり「すごい速さ！記憶を辿る才能があるのかもしれませんね！」",
        image: image4,
        audioUrl: "",
      },
      {
        text: "ゆめり「お見事！時間内にクリアされました！」",
        image: image4,
        audioUrl: "",
      },
    ],
    slow: [
      {
        text: "ゆめり「クリアです！一歩一歩、着実に記憶が繋がりましたね」",
        image: image4,
        audioUrl: "",
      },
      {
        text:
          "ゆめり「お疲れ様です！諦めずに繋げてくれてありがとうございます」",
        image: image4,
        audioUrl: "",
      },
      {
        text: "ゆめり「ゆっくりでも大丈夫！じっくり考えることも大切ですよ」",
        image: image4,
        audioUrl: "",
      },
    ],
  },
}

export const stuckDialogs: Dialog[] = [
  {
    text: "ゆめり「うーん、行き詰まりみたいですね…」",
    image: image6,
    audioUrl: "", // stuckAudio1
  },
]
