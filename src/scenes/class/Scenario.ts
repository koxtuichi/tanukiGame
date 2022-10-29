import "phaser";
import NextIcon from "../../component/NextIcon";
import type {
  timeLineType,
  timeLinesType,
} from "../1_prologue/scenario/prologueScenario";
import Comments from "../../component/Comments";
import PostComment from "../../component/PostCommentFilter";
import Button from "../../component/Button";
import TextDialogBox from "../../component/TextDialogBox";

type initProps = {
  bgImages: string[];
  nanaharaImages: string[];
  timeLineKey: string;
  timeLines: timeLinesType;
};

type setTimeLinesProps = {
  timeLineKey: string;
  timeLines: timeLinesType;
};

type setCharProps = {
  timeLineKey: string;
};

type setComments = {
  timeLineKey: string;
};

type nextTimeLineProps = {
  timeLineKey: string;
};

type timeLineDisp = {
  delta: number;
  timeLineKey: string;
};

type choicesDispProps = {
  timeLineKey: string;
  choices: string[];
};

export default class Scenario extends Phaser.Scene {
  width: number;
  height: number;
  nextSceneName: string;
  bgImages: {} = {};
  nanaharaImages: {} = {};
  chars: {} = {};
  timeLineIndex: number = 0;
  timeLine: timeLineType[];
  elapsedTime: number = 0;
  charIndex: number = 0;
  txtDisp: string = "";
  dialogBox: Phaser.GameObjects.DOMElement;
  nextIcon: Phaser.GameObjects.DOMElement;
  comments: Phaser.GameObjects.DOMElement[] = [];
  commentsPosition: number[] = [];
  topChoices: Phaser.GameObjects.DOMElement;
  bottomChoices: Phaser.GameObjects.DOMElement;
  postCommentFilter: Phaser.GameObjects.DOMElement;
  postComment: string;
  postCommentWidth: number;
  postCommentDOM: Phaser.GameObjects.DOMElement;

  preload() {}

  create() {}

  update(time: number, delta: number) {}

  init({ bgImages, nanaharaImages, timeLineKey, timeLines }: initProps) {
    this.width = this.game.canvas.width;
    this.height = this.game.canvas.height;

    //会話ボックス
    this.dialogBox = this.add.dom(this.width / 2, this.height - 155, "div");
    //次へアイコン
    this.nextIcon = this.add
      .dom(this.width - 40, this.height - 20, "div")
      .setHTML(NextIcon().outerHTML)
      .setVisible(false);

    this.timeLine = timeLines && timeLines[timeLineKey];

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

    if (bgImages && 0 < bgImages.length) {
      bgImages.map((b) => {
        this.bgImages[b] = this.add
          .image(this.width / 2, this.height / 2, b)
          .setVisible(false);
      });
    }

    if (nanaharaImages && 0 < nanaharaImages.length) {
      nanaharaImages.map((n) => {
        this.nanaharaImages[n] = this.add
          .image(1000, this.height / 2 - 40, n)
          .setDisplaySize(500, 500)
          .setVisible(false);
      });
    }
  }

  setTimeLines({ timeLineKey, timeLines }: setTimeLinesProps) {
    if (timeLines) {
      this.timeLine = timeLines[timeLineKey];
    }
  }

  setChar({ timeLineKey }: setCharProps) {
    if (timeLineKey) {
      this.chars[timeLineKey] = [...this.timeLine[this.timeLineIndex].text];
    }
  }

  setComments({ timeLineKey }: setComments) {
    const commentStartPosition = this.width + 200;
    //流れるコメントの開始位置
    this.commentsPosition.push(commentStartPosition);
    //流れるコメント
    this.comments.push(
      this.add
        .dom(this.commentsPosition[this.timeLineIndex], this.height / 2, "div")
        .setHTML(
          Comments({
            comments: this.timeLine[this.timeLineIndex].comments,
          }).outerHTML
        )
    );
  }

  // 文字をひとつずつ順番に表示
  nextChar = () => {
    this.txtDisp += this.chars["start"][this.charIndex];
    this.elapsedTime = 0;
    this.charIndex += 1;
    this.dialogBox.setHTML(
      TextDialogBox({
        text: this.txtDisp,
        name: this.timeLine[this.timeLineIndex].name,
        size: this.timeLine[this.timeLineIndex].size,
      }).outerHTML
    );
  };

  // 次のテキストに移る（同じタイミングでコメント表示）
  nextTimeLine = ({ timeLineKey }: nextTimeLineProps) => {
    this.txtDisp = "";
    this.elapsedTime = 0;
    this.timeLineIndex += 1;
    this.charIndex = 0;
    this.chars[timeLineKey] = [
      ...(this.timeLine[this.timeLineIndex]?.text || ""),
    ];

    //次の流れるコメントを表示する
    if (this.timeLine[this.timeLineIndex]) {
      this.setComments({ timeLineKey: timeLineKey });
    }
  };

  //下のダイアログにテキスト表示
  dialogTextDisp = ({ delta, timeLineKey }: timeLineDisp) => {
    this.elapsedTime += delta;
    if (80 < this.elapsedTime) {
      if (this.charIndex + 1 <= this.chars["start"].length) {
        //一文字ずつ順番にテキストを表示
        this.nextChar();
        this.nextIcon.setVisible(false);
      } else {
        if (
          this.dialogBox.listenerCount("click") === 0 &&
          this.commentsPosition[this.timeLineIndex] < (this.width / 5) * 4
        ) {
          //テキストを最後の文字まで表示したらクリックイベントを追加する
          this.nextIcon.setVisible(true);
          this.dialogBox.addListener("click").on("click", () => {
            if (this.timeLineIndex < this.timeLine.length) {
              this.nextTimeLine({ timeLineKey: timeLineKey });
            }
            this.dialogBox.removeAllListeners();
          });
        }
        if (this.timeLine.length === this.timeLineIndex) {
          //シーンのテキストが最後まで表示したら次のシーンへ遷移する
          if (this.nextSceneName) {
            this.scene.start(this.nextSceneName);
          }
        }
      }
    }
  };

  //コメントを左に流す
  commentsFlowLeft = () => {
    this.comments.map((c, i) => {
      if (this.commentsPosition[i] < -1000) {
        //画面外に出たコメントはなくす
        c.destroy(true);
        return;
      }
      this.commentsPosition[i] -= 7;
      c.setPosition(this.commentsPosition[i], this.height / 2);
    });

    if (this.postComment) {
      if (this.postCommentWidth < -1000) {
        //画面外に出たコメントはなくす
        this.postComment = "";
        this.postCommentWidth = 0;
        this.postCommentDOM.destroy(true);
      }
      this.postCommentWidth -= 7;
      this.postCommentDOM.setPosition(
        this.postCommentWidth + 200,
        this.height / 2 - 80
      );
    }
  };

  //選択肢表示
  choicesDisp = ({ choices, timeLineKey }: choicesDispProps) => {
    if (
      choices &&
      choices.length === 2 &&
      this.topChoices.listenerCount("click") === 0 &&
      !(this.charIndex + 1 <= this.chars[timeLineKey].length)
    ) {
      //上の選択肢
      this.topChoices = this.add
        .dom(this.width / 2, this.height / 2 + 60, "div")
        .setDepth(200)
        .setHTML(
          Button({
            name: choices[0],
            width: "500px",
            height: "auto",
            color: "white",
            background: "black",
            border: "4px solid black",
            padding: "10px 20px",
            fontSize: "30px",
          }).outerHTML
        )
        .addListener("click")
        .on("click", (e) => {
          this.postCommentWidth = this.width;
          this.postComment = e.target.outerText;
          this.postCommentFilter.setVisible(false);
          this.topChoices.destroy(true);
          this.bottomChoices.destroy(true);
          this.postCommentDOM.setHTML(
            Comments({
              comments: [this.postComment],
              isPostComment: true,
            }).outerHTML
          );
        });

      //下の選択肢
      this.bottomChoices = this.add
        .dom(this.width / 2, this.height / 2 - 60, "div")
        .setDepth(200)
        .setHTML(
          Button({
            name: choices[1],
            width: "500px",
            height: "auto",
            color: "white",
            background: "black",
            border: "4px solid black",
            padding: "10px 20px",
            fontSize: "30px",
          }).outerHTML
        )
        .addListener("click")
        .on("click", (e) => {
          this.postCommentWidth = this.width;
          this.postComment = e.target.outerText;
          this.postCommentFilter.setVisible(false);
          this.topChoices.destroy(true);
          this.bottomChoices.destroy(true);
          this.postCommentDOM = this.add
            .dom(this.width, this.height / 2 + 100, "div")
            .setHTML(
              Comments({
                comments: [this.postComment],
                isPostComment: true,
              }).outerHTML
            );
        });

      this.postCommentFilter.setVisible(true);
    }
  };
}
