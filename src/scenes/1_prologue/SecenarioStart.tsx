import "phaser";
import SceneStart from "../../component/SceneStart";

export default class ScenarioStart extends Phaser.Scene {
  constructor() {
    super("ScenarioStart");
  }

  preload() {}

  create() {
    const { width, height } = this.game.canvas;

    this.add
      .dom(width / 2, height / 2, "div")
      .setHTML(
        SceneStart({
          titleText: "20XX年3月13日 深夜",
          width: width + "px",
          height: height + "px",
        }).outerHTML
      )
      .addListener("click")
      .on("click", () => {
        this.scene.start("PrologueScenario");
      });
  }
}
