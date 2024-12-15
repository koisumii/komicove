import { CANVAS_HEIGHT, CANVAS_WIDTH, context } from "../globals.js";
import PlayState from "../states/game/PlayState.js";

export default class UserInterface {

    /**
     * Represents display of information in game (e.g. day, time, score).
     * 
     * @param {PlayState} playState 
     */
    constructor(playState) {
        this.playState = playState;
    }

    render() {
        context.save();
        context.font = '16px Roboto';
        context.fillStyle = 'white';
        context.textBaseline = 'top';
        context.textAlign = 'left';
        context.fillText(`Day ${this.playState.day?.count}`, 20, 20);
        context.fillText(`${this.playState.day?.getTime()}`, 20, 40);

        context.textAlign = 'right';
        context.fillText(
            `Score: ${this.playState.player?.score} / ${this.playState.scoreThreshold}`,
            CANVAS_WIDTH - 20,
            20
        );
        context.restore();
    }
}