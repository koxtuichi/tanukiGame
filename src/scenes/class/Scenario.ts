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
import StressPoint from "../1_prologue/point/StressPoint";
import { Point } from "../../component/Point";
import Image from "../../component/Image";
import { EmotionalType } from "../1_prologue/const/EmotionalType";

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

type setEmotionalToImage = {
  nanaharaImageName: string;
  emotional: EmotionalType;
  width?: number;
  height?: number;
  imgWidth?: number;
  imgHeight?: number;
};

type nextCharProps = {
  timeLineKey: string;
};

type nextAnswerCharProps = {
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
  bgImagesDOM: { [key: string]: Phaser.GameObjects.DOMElement } = {};
  nanaharaImagesDOM: { [key: string]: Phaser.GameObjects.DOMElement } = {};
  charIndex: number = 0;
  chars: {} = {};
  answerCharsIndex: number = 0;
  answerChars: {} = {};
  timeLineIndex: number = 0;
  timeLine: timeLineType[];
  elapsedTime: number = 0;
  txtDisp: string = "";
  dialogBox: Phaser.GameObjects.DOMElement;
  nextIcon: Phaser.GameObjects.DOMElement;
  comments: Phaser.GameObjects.DOMElement[] = [];
  commentsPosition: number[] = [];
  topChoices: Phaser.GameObjects.DOMElement;
  bottomChoices: Phaser.GameObjects.DOMElement;
  choicesFilter: Phaser.GameObjects.DOMElement;
  postCommentIndex: number;
  postCommentPosition: number;
  postCommentDOM: Phaser.GameObjects.DOMElement;
  isPostedComment: boolean = false;
  stressPoint: StressPoint;
  pointDOM: Phaser.GameObjects.DOMElement;
  isChoiceDisp: boolean = false;
  currentBgImgName: string;

  preload() {}

  create() {}

  update(time: number, delta: number) {}

  init({ bgImages, nanaharaImages, timeLineKey, timeLines }: initProps) {
    //ストレスポイント
    this.stressPoint = new StressPoint();
    this.pointDOM = this.add.dom(100, 100, "div");

    this.width = this.game.canvas.width;
    this.height = this.game.canvas.height;

    //背景画像
    if (bgImages && 0 < bgImages.length) {
      bgImages.map((b) => {
        this.bgImagesDOM[b] = this.add
          .dom(this.width / 2, this.height / 2, "div")
          .setHTML(
            Image({
              width: this.width,
              height: this.height,
              src: `src/assets/img/prologue/${b}.png`,
            }).outerHTML
          )
          .setVisible(false);
      });
    }

    //会話ボックス
    this.dialogBox = this.add
      .dom(this.width / 2, this.height - 155, "div")
      .setDepth(100);
    //次へアイコン
    this.nextIcon = this.add
      .dom(this.width - 40, this.height - 20, "div")
      .setHTML(NextIcon().outerHTML)
      .setVisible(false)
      .setDepth(100);

    this.timeLine = timeLines && timeLines[timeLineKey];

    //投稿コメントを表示時の背面フィルター
    this.choicesFilter = this.add
      .dom(0, 0, "div")
      .setHTML(PostComment().outerHTML)
      .setVisible(false)
      .setDepth(100);

    //上の選択肢
    this.topChoices = this.add
      .dom(this.width / 2, this.height / 2 + 60, "div")
      .setDepth(200)
      .setVisible(false);

    //下の選択肢
    this.bottomChoices = this.add
      .dom(this.width / 2, this.height / 2 - 60, "div")
      .setDepth(200)
      .setVisible(false);

    //流れる投稿コメント
    this.postCommentDOM = this.add
      .dom(this.width, this.height, "div")
      .setDepth(100);
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

  setComments() {
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

  setEmotionalToImage({
    nanaharaImageName,
    emotional,
    width,
    height,
    imgWidth,
    imgHeight,
  }: setEmotionalToImage) {
    const w = width || 1000;
    const h = height || this.height / 2 - 40;
    let dropShadow = "";
    switch (emotional) {
      case "angry":
        dropShadow = "drop-shadow(0px 0px 20px #800000)";
        if (this.bgImagesDOM[this.currentBgImgName]) {
          this.bgImagesDOM[this.currentBgImgName].destroy(true);
        }
        this.bgImagesDOM[this.currentBgImgName] = this.add
          .dom(this.width / 2, this.height / 2, "div")
          .setHTML(
            Image({
              width: this.width,
              height: this.height,
              src: `src/assets/img/prologue/${this.currentBgImgName}.png`,
              className: "shake",
            }).outerHTML
          );

        break;
      case "surprising":
        dropShadow = "drop-shadow(0px 0px 10px #00FF00)";
        break;
      case "sad":
        dropShadow = "drop-shadow(0px 0px 10px #00FF00)";
        break;
      case "joyful":
        dropShadow = "drop-shadow(0px 0px 10px #00FF00)";
        break;
      default:
        break;
    }

    if (this.nanaharaImagesDOM[nanaharaImageName]) {
      this.nanaharaImagesDOM[nanaharaImageName].destroy(true);
    }

    this.nanaharaImagesDOM[nanaharaImageName] = this.add
      .dom(w, h, "div")
      .setHTML(
        Image({
          width: imgWidth || 500,
          height: imgHeight || 500,
          src: `src/assets/img/nanahara/${nanaharaImageName}.png`,
          dropShadow: dropShadow,
          className: emotional,
        }).outerHTML
      )
      .setDepth(0);
  }

  // 文字をひとつずつ順番に表示
  nextChar = ({ timeLineKey }: nextCharProps) => {
    this.txtDisp += this.chars[timeLineKey][this.charIndex];
    this.elapsedTime = 0;
    this.charIndex += 1;
    this.dialogBox.setHTML(
      TextDialogBox({
        text: this.txtDisp,
        name: this.timeLine[this.timeLineIndex].name,
        size: this.timeLine[this.timeLineIndex].size,
      }).outerHTML
    );

    if (!(this.charIndex + 1 <= this.chars[timeLineKey].length)) {
      //最後の一文字まで表示されたらダイアログボックスのイベントを削除
      this.dialogBox.removeAllListeners();
    }
  };

  nextAnswerChar = ({ timeLineKey }: nextAnswerCharProps) => {
    if (this.answerCharsIndex === 0) {
      //回答前のテキストは削除
      this.txtDisp = "";
    }
    this.txtDisp += this.answerChars[timeLineKey][this.answerCharsIndex];
    this.elapsedTime = 0;
    this.answerCharsIndex += 1;
    this.dialogBox.setHTML(
      TextDialogBox({
        text: this.txtDisp,
        name: this.timeLine[this.timeLineIndex].name,
        size: this.timeLine[this.timeLineIndex].answerSize || 30,
      }).outerHTML
    );

    if (!(this.answerCharsIndex + 1 <= this.answerChars[timeLineKey].length)) {
      //最後の一文字まで表示されたらダイアログボックスのイベントを削除
      this.dialogBox.removeAllListeners();
    }
  };

  //次のテキストに移る（同じタイミングでコメント表示）
  nextTimeLine = ({ timeLineKey }: nextTimeLineProps) => {
    //回答をリセット
    this.answerChars = {};
    this.answerCharsIndex = 0;

    this.txtDisp = "";
    this.elapsedTime = 0;
    this.timeLineIndex += 1;
    this.charIndex = 0;
    this.chars[timeLineKey] = [
      ...(this.timeLine[this.timeLineIndex]?.text || ""),
    ];
  };

  //下のダイアログにテキスト表示
  dialogTextDisp = ({ delta, timeLineKey }: timeLineDisp) => {
    this.elapsedTime += delta;
    if (80 < this.elapsedTime) {
      if (
        this.answerChars &&
        this.answerChars[timeLineKey] &&
        0 < this.answerChars[timeLineKey].length
      ) {
        //回答がある場合は優先
        if (this.answerCharsIndex + 1 <= this.answerChars[timeLineKey].length) {
          //一文字ずつ順番にテキストを表示
          this.nextAnswerChar({ timeLineKey: timeLineKey });
          this.nextIcon.setVisible(false);
        } else {
          if (
            !(
              this.dialogBox.listenerCount("click") === 0 &&
              this.postCommentPosition < (this.width / 5) * 4
            )
          ) {
            return;
          }

          //テキストを最後の文字まで表示したらクリックイベントを追加する
          this.nextIcon.setVisible(true);
          this.dialogBox.addListener("click").on("click", () => {
            if (this.timeLineIndex < this.timeLine.length) {
              this.nextTimeLine({ timeLineKey: timeLineKey });
              this.setComments();
            }
            this.dialogBox.removeAllListeners();
          });
        }
      } else {
        //通常テキストが表示されている時点で投稿コメントなし
        this.isPostedComment = false;

        //通常のテキスト
        if (this.charIndex + 1 <= this.chars[timeLineKey].length) {
          //一文字ずつ順番にテキストを表示
          this.nextChar({ timeLineKey: timeLineKey });
          this.nextIcon.setVisible(false);
          this.isChoiceDisp = false;
        } else {
          if (
            //コメントの移動幅が足りなければ次へアイコンは表示させない
            this.commentsPosition[this.timeLineIndex] &&
            !(this.commentsPosition[this.timeLineIndex] < (this.width / 5) * 4)
          ) {
            return;
          }

          if (this.timeLine.length === this.timeLineIndex) {
            //シーンのテキストが最後まで表示したら次のシーンへ遷移する
            if (this.nextSceneName) {
              this.scene.start(this.nextSceneName);
            }
            return;
          }

          //テキストを最後の文字まで表示したらクリックイベントを追加する
          this.nextIcon.setVisible(true);
          this.dialogBox.addListener("click").on("click", () => {
            //ダイアログボックスをクリックして選択肢を表示する
            this.isChoiceDisp = true;
            if (
              !this.timeLine[this.timeLineIndex]?.choices &&
              this.timeLineIndex < this.timeLine.length
            ) {
              this.nextTimeLine({ timeLineKey: timeLineKey });
            }
            this.dialogBox.removeAllListeners();
          });
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
      c.setPosition(this.commentsPosition[i], this.height / 2).setDepth(100);
    });

    if (this.postCommentPosition < -1000) {
      //画面外に出たコメントはなくす
      this.postCommentPosition = 0;
      this.postCommentDOM.destroy(true);
      return;
    }
    this.postCommentPosition -= 7;
    this.postCommentDOM.setPosition(
      this.postCommentPosition + 200,
      this.height / 2 - 80
    );
  };

  //選択肢表示
  choicesDisp = ({ choices, timeLineKey }: choicesDispProps) => {
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
        this.isPostedComment = true;
        this.postCommentPosition = this.width;
        this.postCommentIndex = 0;
        this.choicesFilter.setVisible(false);
        this.topChoices.setVisible(false);
        this.bottomChoices.setVisible(false);
        this.postCommentDOM = this.add
          .dom(this.width, this.height / 2 + 100, "div")
          .setHTML(
            Comments({
              comments: [e.target.outerText],
              isPostComment: true,
            }).outerHTML
          );
        if (this.timeLine[this.timeLineIndex]?.answer) {
          //回答があれば表示
          this.answerChars[timeLineKey] = [
            ...(this.timeLine[this.timeLineIndex]?.answer[
              this.postCommentIndex
            ] || ""),
          ];
          //ストレスポイントをセット
          this.stressPoint.setPoint({
            point:
              this.timeLine[this.timeLineIndex].stressPoint[
                this.postCommentIndex
              ],
          });
          this.pointDOM.destroy(true);
          this.pointDOM.setVisible(false);
          this.pointDOM = this.add
            .dom(100, 100, "div")
            .setHTML(Point(this.stressPoint.stressPoint).outerHTML);
        }
        this.setComments();
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
        this.isPostedComment = true;
        this.postCommentPosition = this.width;
        this.postCommentIndex = 1;
        this.choicesFilter.setVisible(false);
        this.topChoices.setVisible(false);
        this.bottomChoices.setVisible(false);
        this.postCommentDOM = this.add
          .dom(this.width, this.height / 2 + 100, "div")
          .setHTML(
            Comments({
              comments: [e.target.outerText],
              isPostComment: true,
            }).outerHTML
          );
        if (this.timeLine[this.timeLineIndex]?.answer) {
          //回答があれば表示
          this.answerChars[timeLineKey] = [
            ...(this.timeLine[this.timeLineIndex].answer[
              this.postCommentIndex
            ] || ""),
          ];
          //ストレスポイントをセット
          this.stressPoint.setPoint({
            point:
              this.timeLine[this.timeLineIndex].stressPoint[
                this.postCommentIndex
              ],
          });
          this.pointDOM.setVisible(false);
          this.pointDOM.destroy(true);
          this.pointDOM = this.add
            .dom(100, 100, "div")
            .setHTML(Point(this.stressPoint.stressPoint).outerHTML);
        }
        this.setComments();
      });

    this.choicesFilter.setVisible(true);
  };
}
