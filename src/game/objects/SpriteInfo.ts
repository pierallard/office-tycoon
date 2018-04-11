import {PositionTransformer} from "../PositionTransformer";

export class SpriteInfo {
    private name: string;
    private anchorBottom: number;
    private left: number;
    private bottom: number;

    constructor(name: string, left: number, bottom: number, anchorBottom: number) {
        this.name = name;
        this.left = left;
        this.bottom = bottom;
        this.anchorBottom = anchorBottom;
    }

    getSpriteName(): string {
        return this.name;
    }

    getAnchorBottom() {
        return this.anchorBottom;
    }

    getRealPosition(position: PIXI.Point, leftOriented: boolean): PIXI.Point {
        return this.getRealPositionFromOrigin(PositionTransformer.getRealPosition(position), leftOriented);
    }

    getSittablePosition(leftOriented: boolean): PIXI.Point {
        return new PIXI.Point(leftOriented ? - this.left : this.left, this.bottom - this.anchorBottom + 3);
    }

    getRealPositionFromOrigin(spriteSource: PIXI.Point, leftOriented: boolean) {
        return new PIXI.Point(
            spriteSource.x + (leftOriented ? - this.left : this.left),
            spriteSource.y + this.bottom - this.anchorBottom
        )
    }

    getAnchor(sprite: Phaser.Sprite): PIXI.Point {
        return new PIXI.Point(
            0.5,
            1.0 - this.anchorBottom / sprite.height
        );
    }
}