import Input from "../../lib/Input.js";
import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, input } from "../globals.js";
import PlayState from "../states/game/PlayState.js";
import KeyPrompt from "./KeyPrompt.js";
import ProgressBanner from "./ProgressBanner.js";

export default class UserInterface {
    static FONT = '16px Roboto';

    /**
     * Represents display of information in game (e.g. day, time, score, key prompt).
     * 
     * @param {PlayState} playState The play state corresponding to this instance of UserInterface.
     * @param {string} promptKey A key from Input.KEYS that will be shown in prompt.
     */
    constructor(playState, promptKey) {
        this.playState = playState;

        this.keyPrompt = new KeyPrompt(promptKey, UserInterface.FONT, 0.5);

        this.keyPrompt.position.x = (CANVAS_WIDTH - this.keyPrompt.dimensions.x) / 2;
        this.keyPrompt.position.y = CANVAS_HEIGHT - this.keyPrompt.dimensions.y - 48;

        context.save();
        context.font = UserInterface.FONT;

        context.restore();

        /** @type {ProgressBanner?} */
        this.progressBanner = null;
    }

    showKeyPrompt() {
        this.keyPrompt.isVisible = true;
    }

    hideKeyPrompt() {
        this.keyPrompt.isVisible = false;
    }

    update(dt) {
        if (this.progressBanner?.isDone)
            this.progressBanner = null;

        this.keyPrompt.update(dt);
    }

    render() {
        this.keyPrompt.render();
        context.save();

        context.font = UserInterface.FONT;
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
        this.progressBanner?.render();
    }
}