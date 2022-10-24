import "phaser";
import { Scenes } from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#FFF",
  parent: "phaser",
  width: 1280,
  height: 720,
  scene: Scenes,
  dom: {
    createContainer: true,
  },
  audio: {
    disableWebAudio: true,
  },
};

new Phaser.Game(config);
