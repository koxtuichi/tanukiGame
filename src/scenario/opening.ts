type openingType = {
  [timelineId: string]: {
    next: "text" | "scene";
    name: string;
    text: string;
    bgImgId: string;
    size?: number;
    comments?: string[];
    selects?: string[];
  }[];
};

export const opening: openingType = {
  start: [
    {
      next: "text",
      name: "とある配信者",
      text: "え！？",
      bgImgId: "",
      size: 50,
      comments: [
        "突発かよ",
        "ቻﾝቻﾝがቺቻቺቻ",
        "よ",
        "くさそ",
        "よ。",
        "うぽつ",
        "うぽつ",
        "きたああ",
        "カエル？",
        "食え",
        "とうとう動物まで殺めたのか",
        "ぶっさ",
        "無職になったか",
      ],
    },
    {
      next: "text",
      name: "とある配信者",
      text: "あのさぁ、コンビニに来たら動物死んでんだけど・・・。",
      bgImgId: "",
      size: 30,
    },
    {
      next: "text",
      name: "とある配信者",
      text: "これ食えるか？",
      bgImgId: "",
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
      next: "text",
      name: "とある配信者",
      text: "きみたち教えてくれよぉ",
      bgImgId: "",
      size: 30,
    },
    {
      next: "text",
      name: "とある配信者",
      text: "サッカーボールキックで運んでいいかな？",
      bgImgId: "",
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
      next: "text",
      name: "とある配信者",
      text: "やっぱ争奪戦だよな！はやいものがちだよな",
      bgImgId: "",
      size: 30,
    },
  ],
};
