import {InteractiveObjectInterface} from "./InteractiveObjectInterface";
import {DIRECTION} from "../Direction";
import {Employee} from "../human_stuff/Employee";

export class ObjectReferer {
    private obj: InteractiveObjectInterface;
    private subObjectNumber: number;

    constructor(object: InteractiveObjectInterface, subObjectNumber: number) {
        this.obj = object;
        this.subObjectNumber = subObjectNumber;
    }

    getObject(): InteractiveObjectInterface {
        return this.obj;
    }

    isUsed(): boolean {
        return this.obj.isUsed(this.subObjectNumber);
    }

    getPositionGap(): PIXI.Point {
        return this.obj.getPositionGap(this.subObjectNumber);
    }

    getEntries(): DIRECTION[] {
        return this.obj.getEntries(this.subObjectNumber);
    }

    getPosition(): PIXI.Point {
        return this.obj.getCellPositionSubObject(this.subObjectNumber);
    }

    setUsed(human: Employee) {
        this.obj.setUsed(this.subObjectNumber, human);
    }

    setUnused() {
        this.obj.setUnused(this.subObjectNumber);
    }

    getIdentifier(): number {
        return this.subObjectNumber;
    }
}
