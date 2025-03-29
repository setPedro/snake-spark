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

    private lastTime: number = 0;

    update(time: number) {
        if (!this.lastTime) this.lastTime = time;
        const deltaTime = (time - this.lastTime) / 1000;
        this.lastTime = time;

        const [xDir, yDir] = this.snake.direction;
        if (this.keys.w.isDown && yDir !== 1) this.snake.move_snake("w");
        if (this.keys.a.isDown && xDir !== 1) this.snake.move_snake("a");
        if (this.keys.s.isDown && yDir !== -1) this.snake.move_snake("s");
        if (this.keys.d.isDown && xDir !== -1) this.snake.move_snake("d");

        this.snake.update(deltaTime);

        const [xGrid, gridY] = this.snake.position;

        this.snakeGraphics.setPosition(
            xGrid * sizes.square,
            gridY * sizes.square
        );
    }

    onGameOver() {
        console.log("Game Over!");
        this.scene.restart();
    }

    shutdown() {
        if (this.snakeGraphics) this.snakeGraphics.destroy();
    }
}

window.onGameOver = () => {
    const sceneManager = window.game.scene;
    const gameScene = sceneManager.getScene("GameScene") as GameScene;

    gameScene.onGameOver();
};

export default GameScene;
