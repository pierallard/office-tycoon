import {GROUP_INTERFACE} from "../game_state/Play";
import {COLOR} from "../Pico8Colors";

export const DEFAULT_BAR_HEIGHT = 10;

export class Gauge {
    protected value: number;
    private width: number;
    private graphics: Phaser.Graphics;
    private color: COLOR;
    private visible: boolean;
    private height: number;

    constructor(width: number, color: COLOR, height: number = null) {
        this.value = 0;
        this.width = Math.round(width);
        this.color = color;
        this.visible = true;
        this.height = height ? height : DEFAULT_BAR_HEIGHT;
    }

    create(game: Phaser.Game, groups: { [index: string]: Phaser.Group }, position: PIXI.Point) {
        this.graphics = game.add.graphics(position.x, position.y, groups[GROUP_INTERFACE]);
        this.update();
    }

    setValue(value: number) {
        this.value = value;
        this.update();
    }

    update() {
        this.graphics.clear();
        if (this.visible) {
            this.graphics.lineStyle(1, COLOR.WHITE);
            this.graphics.drawRect(0, 0.5, this.width, this.height);
            this.graphics.lineStyle(0);
            this.graphics.beginFill(COLOR.BLACK);
            this.graphics.drawRect(0.5, 1, this.width - 1, this.height - 1);
            if (this.value > 0) {
                this.graphics.beginFill(this.getColor());
                if (this.value >= 1) {
                    this.graphics.drawRect(0.5, 1, Math.floor(this.width - 2) + 1, this.height - 1);
                } else {
                    this.graphics.drawRect(0.5, 1, Math.floor((this.width - 2) * this.value) + 1, this.height - 1);
                }
            }
            this.graphics.endFill();

        }
    }

    show() {
        this.visible = true;
        this.update();
    }

    hide() {
        this.visible = false;
        this.update();
    }

    destroy(destroyChildren: boolean) {
        this.graphics.destroy(destroyChildren);
    }

    getGraphics(): Phaser.Graphics {
        return this.graphics;
    }

    protected getColor(): COLOR {
        return this.color;
    }
}
