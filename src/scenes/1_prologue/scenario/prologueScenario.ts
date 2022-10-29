export type timeLineType = {
  name: string;
  text: string;
  bgImgId: string;
  size?: number;
  comments?: string[];
  choices?: string[];
  answer?: string[];
  answerSize?: number;
  stressPoint?: number[];
};

export type timeLinesType = {
  [timelineId: string]: timeLineType[];
};

export const prologueScenario: timeLinesType = {
  start: [
    {
      name: "とある配信者",
      text: "えええぇぇぇっ！？",
      bgImgId: "tanuki",
      size: 50,
      comments: [
        "突発かよ",
        "ቻﾝቻﾝがቺቻቺቻ",
        "くさそ",
        "よ",
        "うぽつ",
        "きたああ",
        "カエル？",
        "食え",
        "ぶっさ",
      ],
      choices: ["どうした", "ぶっさ"],
      answer: ["はぁ・・・", "ぶっさってもう見慣れてるでしょ"],
      answerSize: 30,
      stressPoint: [0, 1],
    },
    {
      name: "とある配信者",
      text: "あのさぁ、コンビニに来たら動物死んでんだけど・・・。",
      bgImgId: "tanuki",
      size: 30,
    },
    {
      name: "とある配信者",
      text: "これ食えるか？",
      bgImgId: "tanuki",
      size: 30,
      comments: [
        "くえないだろ",
        "たべてみろよ",
        "生でいけよ",
        "どしたん",
        "焼けばセーフ",
        "食える",
        "はよ見せろ",
        "ቻﾝቻﾝがቺቻቺቻ",
        "なにがいたの",
        "英雄になれーーー",
        "食べよ",
        "食べよう",
        "ぶさ",
        "食料",
        "ネコ？",
        "カエル？",
        "え",
        "見せて",
        "ロードキルか？",
        "逆に食べない理由って何なの？",
      ],
      choices: ["だから暗くてみえないって", "まずは生態調査だ"],
      answer: ["ああ、ご、ごめん。。", "だよな！"],
      stressPoint: [5, 1],
    },
    {
      name: "とある配信者",
      text: "でも食う前にまず確保しなきゃ",
      bgImgId: "tanuki",
      size: 30,
    },
    {
      name: "とある配信者",
      text: "だれにも取られたくない！これは争奪戦だ",
      bgImgId: "tanuki",
      size: 30,
    },
    {
      name: "とある配信者",
      text: "ところでサッカーボールキックで運んでいいかな？",
      bgImgId: "tanuki",
      size: 30,
      comments: [
        "草",
        "サッカーボールキック？？",
        "けるなｗｗ",
        "おい、母さんなくぞ",
        "食べ物を粗末にするな",
        "こいつまじかｗ",
        "いいよ",
        "ぶっさ",
        "食材ゲット",
        "狂ってやがる",
        "ቻﾝቻﾝがቺቻቺቻ",
        "お薬飲んで！",
        "狂犬病",
        "💊",
        "dmみろ",
        "カメラつけろ",
      ],
      choices: ["リフティングでいけ", "不謹慎だからやめろ"],
      answer: [
        "リフティングなんてむりだよぉ",
        "やめろってなんだよぉ・・・まだ配信はじめたばかりでしょぉ！？もう少し我慢してよー",
      ],
      stressPoint: [5, 10],
    },
    {
      name: "とある配信者",
      text: "まぁでも今いかなきゃいけないからいくか・・・！",
      bgImgId: "tanuki",
      size: 30,
      comments: [
        "草",
        "いいからはよいけ",
        "なに迷ってるんだよ",
        "おい、母さんなくぞ",
        "食べ物を粗末にするな",
        "こいつまじかｗ",
        "いいよ",
        "ぶっさ",
        "食材ゲット",
        "狂ってやがる",
        "ቻﾝቻﾝがቺቻቺቻ",
        "お薬飲んで！",
        "狂犬病",
        "💊",
        "dmみろ",
        "カメラつけろ",
      ],
    },
  ],
};
