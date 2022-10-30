import "phaser";
import { prologueScenario } from "./scenario/prologueScenario";
import Scenario from "../class/Scenario";

export default class PrologueScenario extends Scenario {
  constructor() {
    super("PrologueScenario");
  }

  preload() {
    this.load.image("migikata_age", "src/assets/img/nanahara/migikata_age.png");
    this.load.image("tanuki", "src/assets/img/prologue/tanuki.png");
  }

  create() {
    //共通の初期化
    this.init({
      bgImages: ["tanuki"],
      nanaharaImages: ["migikata_age"],
      timeLineKey: "start",
      timeLines: prologueScenario,
    });
    //次のシーン
    this.nextSceneName = "PartSelective";
    //タイムラインの番号
    this.timeLineIndex = 0;
    //タイムラインをセット
    this.setTimeLines({ timeLineKey: "start", timeLines: prologueScenario });
    //タイムラインテキストをセット
    this.setChar({ timeLineKey: "start" });

    //背景画像
    this.bgImagesDOM["tanuki"].setVisible(true);
    //七原くん画像
    this.nanaharaImagesDOM["migikata_age"]
      .setVisible(true)
      .addListener("click")
      .on("click", () => {
        //メニュー表示
        console.dir("七原くん画像をクリックしてメニューを開く");
      });
  }

  update(time: number, delta: number) {
    if (
      //表示フラグたっている
      this.isChoiceDisp &&
      //選択肢ある
      this.timeLine[this.timeLineIndex]?.choices &&
      //投稿コメントが画面にない
      !this.isPostedComment &&
      //ダイアログのテキストが最後の文字まで表示されている
      !(this.charIndex + 1 <= this.chars["start"].length) &&
      //選択肢が表示されていない
      !this.topChoices.visible &&
      !this.bottomChoices.visible
    ) {
      //選択肢を表示する
      this.choicesDisp({
        choices: this.timeLine[this.timeLineIndex].choices,
        timeLineKey: "start",
      });
    } else {
      //コメントを左に流す
      this.commentsFlowLeft();
    }

    //ダイアログにテキスト表示
    this.dialogTextDisp({ delta: delta, timeLineKey: "start" });
  }
}
