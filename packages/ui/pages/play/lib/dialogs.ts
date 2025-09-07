import audio010 from "../../../assets/010.wav"
import audio011 from "../../../assets/011.wav"
import audio012 from "../../../assets/012.wav"
import audio013 from "../../../assets/013.wav"
import audio014 from "../../../assets/014.wav"
import audio015 from "../../../assets/015.wav"
import audio016 from "../../../assets/016.wav"
import audio017 from "../../../assets/017.wav"
import image4 from "../../../assets/yumeri4.png"
import image6 from "../../../assets/yumeri6.png"
import image7 from "../../../assets/yumeri7.png"

export type Dialog = {
  text: string
  image: string
  audioUrl?: string
}

export const clearDialogs = {
  perfect: [
    {
      text: "ゆめり「完璧です！すごい！」",
      image: image7,
      audioUrl: audio010,
    },
    {
      text: "ゆめり「お見事です！流石ですね」",
      image: image7,
      audioUrl: audio011,
    },
  ],
  normal: {
    fast: [
      {
        text:
          "ゆめり「クリアおめでとうございます！とってもスムーズでしたね！」",
        image: image4,
        audioUrl: audio012,
      },
      {
        text: "ゆめり「すごい速さ！天才ですね」",
        image: image4,
        audioUrl: audio013,
      },
    ],
    slow: [
      {
        text: "ゆめり「クリアです！一歩一歩、着実に記憶が繋がりましたね」",
        image: image4,
        audioUrl: audio014,
      },
      {
        text: "ゆめり「お疲れ様です！」",
        image: image4,
        audioUrl: audio015,
      },
      {
        text: "ゆめり「ゆっくりでも大丈夫！じっくり考えることも大切ですよ」",
        image: image4,
        audioUrl: audio016,
      },
    ],
  },
}

export const stuckDialogs: Dialog[] = [
  {
    text: "ゆめり「うーん、行き詰まっちゃったみたいですね」",
    image: image6,
    audioUrl: audio017,
  },
]
