import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import { sizes } from "./consts";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: sizes.width,
    height: sizes.height,
    scene: [GameScene],
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
};

window.game = new Phaser.Game(config);
