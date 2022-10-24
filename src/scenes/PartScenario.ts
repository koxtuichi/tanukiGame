import "phaser";
import TextDialogBox from "../component/TextDialogBox";
import { opening } from "../scenario/opening";
import Comment from "../component/Comment";

export default class PartScenario extends Phaser.Scene {
  width: number;
  height: number;
  elapsedTime: number = 0;
  charIndex: number = 0;
  txtDisp: string = "";
  timelineKey: number = 0;
  dialogBox: Phaser.GameObjects.DOMElement;
  chars: string[];
  comment: Phaser.GameObjects.DOMElement[] = [];
  commentWidth: number[] = [];

  constructor() {
    super("PartScenario");
  }

  preload() {
    this.load.image("migikata_age", "src/assets/img/nanahara/migikata_age.png");
    this.load.image("layout", "src/assets/img/layout.png");
  }

  create() {
    this.width = this.game.canvas.width;
    this.height = this.game.canvas.height;

    // 表示するテキスト
    this.chars = [...opening["start"][this.timelineKey].text];

    this.add.image(this.width / 2, this.height / 2, "layout");
    this.add
      .image(1000, this.height / 2 - 100, "migikata_age")
      .setDisplaySize(500, 500);

    // 会話ボックスの作成
    this.dialogBox = this.add
      .dom(this.width / 2, this.height - 155, "div")
      .addListener("click")
      .on("click", () => {
        if (this.timelineKey < opening["start"].length) {
          this.nextTimeLine();
        }
      });

    this.commentWidth.push(this.width + 200);

    this.comment.push(
      this.add
        .dom(this.commentWidth[this.timelineKey], this.height / 2, "div")
        .setHTML(
          Comment({ comments: opening["start"][this.timelineKey].comments })
            .outerHTML
        )
    );
  }

  update(time: number, delta: number) {
    this.comment.map((c, i) => {
      this.commentWidth[i] -= 5;
      c.setPosition(this.commentWidth[i], this.height / 2);
    });

    // テキストを表示
    this.elapsedTime += delta;
    if (40 < this.elapsedTime) {
      if (opening["start"].length === this.timelineKey) {
        this.scene.start("PartSelective");
      }
      if (this.charIndex + 1 <= this.chars.length) {
        // テキストを表示
        this.nextChar();
      }
    }
  }

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

  // 次のテキストに移る
  nextTimeLine = () => {
    this.txtDisp = "";
    this.elapsedTime = 0;
    this.timelineKey += 1;
    this.charIndex = 0;
    this.chars = [...(opening["start"][this.timelineKey]?.text || "")];

    if (opening["start"][this.timelineKey]) {
      this.commentWidth.push(this.width + 200);
      this.comment.push(
        this.add
          .dom(this.commentWidth[this.timelineKey], this.height / 2, "div")
          .setHTML(
            Comment({ comments: opening["start"][this.timelineKey].comments })
              .outerHTML
          )
      );
    }
  };
}
