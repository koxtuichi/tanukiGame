import "phaser";
import SceneStart from "../component/SceneStart";

export default class PartScenarioStart extends Phaser.Scene {
  constructor() {
    super("PartScenarioStart");
  }

  preload() {}

  create() {
    const { width, height } = this.game.canvas;

    this.add
      .dom(width / 2, height / 2, "div")
      .setHTML(SceneStart({ titleText: "20XX年3月13日 深夜" }).outerHTML)
      .addListener("click")
      .on("click", () => {
        this.scene.start("PartScenario");
      });
  }
}
