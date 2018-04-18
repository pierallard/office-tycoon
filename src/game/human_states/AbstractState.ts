import {HumanState} from "./HumanState";
import {STATE} from "../human_stuff/HumanStateManager";
import {Employee} from "../human_stuff/Employee";

export abstract class AbstractState implements HumanState {
    protected events: Phaser.TimerEvent[];
    protected active: boolean;
    protected game: Phaser.Game;
    protected human: Employee;

    constructor(human: Employee) {
        this.events = [];
        this.active = false;
        this.human = human;
    }

    getNextState(): HumanState {
        return this.active ? this : null;

    }

    start(game: Phaser.Game): boolean {
        this.active = true;
        this.game = game;

        return true;
    }

    stop(game: Phaser.Game): void {
        this.events.forEach((event) => {
            game.time.events.remove(event);
        });
        this.active = false;
    }

    abstract getState(): STATE;
}