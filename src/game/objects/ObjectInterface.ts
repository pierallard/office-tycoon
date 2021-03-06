import {DIRECTION} from "../Direction";

export interface ObjectInterface {
    getPositions(): PIXI.Point[];
    create(game: Phaser.Game, groups: { [index: string]: Phaser.Group }): void;
    getEntries(objectNumber: number): DIRECTION[];
    getOrigin(): PIXI.Point;
}
