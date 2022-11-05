import "phaser";
import Button from "../component/Button";
import TitleLogo from "../component/TitleLogo";

export default class Title extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  preload() {}

  create() {
    const { width, height } = this.game.canvas;

    this.add.dom(0, 9, "div").setHTML(TitleLogo().outerHTML);
    this.add
      .dom(width / 2 - 160 - 24, height - 80, "div")
      .setHTML(
        Button({ name: "フルスクリーン", width: 160, height: 80 }).outerHTML
      )
      .addListener("pointerup")
      .on("pointerup", () => {
        this.scale.startFullscreen();
      });
    this.add
      .dom(width / 2, height - 80, "div")
      .setHTML(Button({ name: "スタート", width: 160, height: 80 }).outerHTML)
      .addListener("click")
      .on("click", () => {
        this.scene.start("ScenarioStart");
      });
    this.add
      .dom(width / 2 + 160 + 24, height - 80, "div")
      .setHTML(
        Button({ name: "オプション", width: 160, height: 80 }).outerHTML
      );

    //レスポンシブ
    this.scale.displaySize.setAspectRatio(width / height);
    this.scale.refresh();
  }
}
