import "phaser";
import TextDialogBox from "../../component/TextDialogBox";
import { opening } from "../../scenario/opening";
import Comment from "../../component/Comment";
import PostComment from "../../component/PostCommentFilter";
import Button from "../../component/Button";

export default class PrologueScenario extends Phaser.Scene {
  width: number;
  height: number;
  elapsedTime: number = 0;
  charIndex: number = 0;
  txtDisp: string = "";
  timelineKey: number = 0;
  dialogBox: Phaser.GameObjects.DOMElement;
  chars: string[];
  comments: Phaser.GameObjects.DOMElement[] = [];
  commentsStartPosition: number[] = [];
  topChoices: Phaser.GameObjects.DOMElement;
  bottomChoices: Phaser.GameObjects.DOMElement;
  postCommentFilter: Phaser.GameObjects.DOMElement;
  postComment: string;
  postCommentWidth: number;
  postCommentDOM: Phaser.GameObjects.DOMElement;

  constructor() {
    super("PrologueScenario");
  }

  preload() {
    this.load.image("migikata_age", "src/assets/img/nanahara/migikata_age.png");
    this.load.image("tanuki", "src/assets/img/prologue/tanuki.png");
  }

  create() {
    this.width = this.game.canvas.width;
    this.height = this.game.canvas.height;

    //背景画像
    this.add.image(this.width / 2, this.height / 2, "tanuki");

    //七原くん画像
    this.add
      .image(1000, this.height / 2 - 40, "migikata_age")
      .setDisplaySize(500, 500);

    // 表示するテキスト
    this.chars = [...opening["start"][this.timelineKey].text];

    // 会話ボックス
    this.dialogBox = this.add.dom(this.width / 2, this.height - 155, "div");

    //流れるコメント
    this.comments.push(
      this.add
        .dom(
          this.commentsStartPosition[this.timelineKey],
          this.height / 2,
          "div"
        )
        .setHTML(
          Comment({ comments: opening["start"][this.timelineKey].comments })
            .outerHTML
        )
    );
    //流れるコメントの開始位置
    this.commentsStartPosition.push(this.width + 200);

    //投稿コメントを表示時の背面フィルター
    this.postCommentFilter = this.add
      .dom(0, 0, "div")
      .setHTML(PostComment().outerHTML)
      .setVisible(false)
      .setDepth(100);
    //上の選択肢
    this.topChoices = this.add
      .dom(this.width / 2, this.height / 2 + 60, "div")
      .setDepth(200);
    //下の選択肢
    this.bottomChoices = this.add
      .dom(this.width / 2, this.height / 2 - 60, "div")
      .setDepth(200);
    //流れる投稿コメント
    this.postCommentDOM = this.add.dom(this.width, this.height, "div");
  }

  update(time: number, delta: number) {
    if (
      opening["start"][this.timelineKey]?.selects &&
      !this.postComment &&
      !(this.charIndex + 1 <= this.chars.length)
    ) {
      //ダイアログテキストがすべて表示されてから選択肢を表示する
      this.selectsDisp();
    } else {
      //流れるコメント表示
      this.comments.map((c, i) => {
        this.commentsStartPosition[i] -= 5;
        c.setPosition(this.commentsStartPosition[i], this.height / 2);
      });
      this.postCommentWidth -= 5;
      this.postCommentDOM.setPosition(
        this.postCommentWidth + 200,
        this.height / 2 - 80
      );
    }

    this.textDisp(delta);
  }

  //下のダイアログにテキスト表示
  textDisp = (delta: number) => {
    this.elapsedTime += delta;
    if (80 < this.elapsedTime) {
      if (opening["start"].length === this.timelineKey) {
        //シーンのテキストが最後まで表示したら次のシーンへ遷移する
        this.scene.start("PartSelective");
      }
      if (this.charIndex + 1 <= this.chars.length) {
        //一文字ずつ順番にテキストを表示
        this.nextChar();
        if (this.dialogBox.listenerCount("click") === 0) {
          this.dialogBox.removeAllListeners();
        }
      } else {
        //テキストを最後の文字まで表示したらクリックイベントを追加する
        if (this.dialogBox.listenerCount("click") === 0) {
          this.dialogBox.addListener("click").on("click", () => {
            if (this.timelineKey < opening["start"].length) {
              this.nextTimeLine();
            }
          });
        }
      }
    }
  };

  // 文字をひとつずつ順番に表示
  nextChar = () => {
    this.txtDisp += this.chars[this.charIndex];
    this.elapsedTime = 0;
    this.charIndex += 1;
    this.dialogBox.setHTML(
      TextDialogBox({
        text: this.txtDisp,
        name: opening["start"][this.timelineKey].name,
        size: opening["start"][this.timelineKey].size,
      }).outerHTML
    );
  };

  // 次のテキストに移る（同じタイミングでコメント表示）
  nextTimeLine = () => {
    this.txtDisp = "";
    this.elapsedTime = 0;
    this.timelineKey += 1;
    this.charIndex = 0;
    this.chars = [...(opening["start"][this.timelineKey]?.text || "")];

    if (opening["start"][this.timelineKey]) {
      this.commentsStartPosition.push(this.width + 200);
      this.comments.push(
        this.add
          .dom(
            this.commentsStartPosition[this.timelineKey],
            this.height / 2,
            "div"
          )
          .setHTML(
            Comment({ comments: opening["start"][this.timelineKey].comments })
              .outerHTML
          )
      );
    }
  };

  //選択肢表示
  selectsDisp = () => {
    const selects = opening["start"][this.timelineKey]?.selects;
    if (
      selects &&
      selects.length === 2 &&
      this.topChoices.listenerCount("click") === 0 &&
      !(this.charIndex + 1 <= this.chars.length)
    ) {
      //上の選択肢
      this.topChoices
        .setHTML(
          Button({
            name: selects[0],
            width: "300px",
            height: "auto",
            color: "white",
            background: "black",
            border: "4px solid black",
            padding: "20px 30px",
          }).outerHTML
        )
        .addListener("click")
        .on("click", (e) => {
          this.postCommentWidth = this.width;
          this.postComment = e.target.outerText;
          this.postCommentFilter.setVisible(false);
          this.topChoices.setVisible(false);
          this.bottomChoices.setVisible(false);
          this.postCommentDOM.setHTML(
            Comment({
              comments: [this.postComment],
              isPostComment: true,
            }).outerHTML
          );
        });

      //下の選択肢
      this.bottomChoices
        .setHTML(
          Button({
            name: selects[1],
            width: "300px",
            height: "auto",
            color: "white",
            background: "black",
            border: "4px solid black",
            padding: "20px 30px",
          }).outerHTML
        )
        .addListener("click")
        .on("click", (e) => {
          this.postCommentWidth = this.width;
          this.postComment = e.target.outerText;
          this.postCommentFilter.setVisible(false);
          this.topChoices.setVisible(false);
          this.bottomChoices.setVisible(false);
          this.postCommentDOM = this.add
            .dom(this.width, this.height / 2 + 100, "div")
            .setHTML(
              Comment({
                comments: [this.postComment],
                isPostComment: true,
              }).outerHTML
            );
        });

      this.postCommentFilter.setVisible(true);
    }
  };
}
