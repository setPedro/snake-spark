import Phaser from "phaser";
import { createGrid } from "../utils/createGrid";
import init, { Rectangle } from "../../public/pkg/snake_spark";
import { colors, sizes } from "../consts";

class GameScene extends Phaser.Scene {
  private keys!: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };

  private snake!: Rectangle;
  private snakeGraphics!: Phaser.GameObjects.Rectangle;
  private pixelPosition: [number, number] = [210, 210];

  constructor() {
    super({ key: "GameScene" });
  }

  async create() {
    await init();
    this.snake = new Rectangle();
    createGrid(this);

    this.snakeGraphics = this.add
      .rectangle(
        this.pixelPosition[0],
        this.pixelPosition[1],
        sizes.square - sizes.gap,
        sizes.square - sizes.gap,
        colors.snake.human
      )
      .setOrigin(0.5);

    this.keys = {
      w: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      a: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      s: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  update() {
    const [dirX, dirY] = this.snake.direction();
    const speed = 2;

    if (this.keys.w.isDown && dirY !== 1) this.snake.move_snake("w");
    if (this.keys.a.isDown && dirX !== 1) this.snake.move_snake("a");
    if (this.keys.s.isDown && dirY !== -1) this.snake.move_snake("s");
    if (this.keys.d.isDown && dirX !== -1) this.snake.move_snake("d");

    this.pixelPosition[0] += dirX * speed;
    this.pixelPosition[1] += dirY * speed;

    this.snakeGraphics.setPosition(
      this.pixelPosition[0],
      this.pixelPosition[1]
    );

    const gridX = Math.round(this.pixelPosition[0] / sizes.square);
    const gridY = Math.round(this.pixelPosition[1] / sizes.square);
    this.snake.update_position(gridX, gridY);
  }
}

export default GameScene;
