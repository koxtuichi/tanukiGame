export type timeLineType = {
  name: string;
  text: string;
  bgImgId: string;
  size?: number;
  comments?: string[];
  selects?: string[];
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
    },
    {
      name: "とある配信者",
      text: "きみたち教えてくれよぉ",
      bgImgId: "tanuki",
      size: 30,
    },
    {
      name: "とある配信者",
      text: "だれにもとられたくないんだよ",
      bgImgId: "tanuki",
      size: 30,
    },
    {
      name: "とある配信者",
      text: "サッカーボールキックで運んでいいかな？",
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
      selects: ["争奪戦だ！はやくしろ", "不謹慎だからやめろ"],
    },
    {
      name: "とある配信者",
      text: "やっぱ争奪戦だよな！はやいものがちだよな",
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
    },
  ],
};
