import Easing from "../../lib/Easing.js";
import Vector from "../../lib/Vector.js";
import { context, timer } from "../globals.js";

export default class ScorePopup {
    /**
     * An UI element that displays the amount of score gained by the player.
     * @param {Vector} position The initial position of the piece of text on canvas.
     * @param {number} score The amount of score gained by the player.
     * @param {number} dy The y displacement to apply to the piece of text.
     * @param {number} duration The duration for which the score will be displayed.
     * @param {string} textStyle The desired text style for prompt rendering, CanvasRenderingContext2D::font.
     */
    constructor(position, score, dy, duration, textStyle) {
        this.x = position.x;
        this.y = position.y;
        this.text = `+${score}`;
        this.textStyle = textStyle;
        this.opacity = 1;
        this.isDone = false;

        this.startAnimation(dy, duration);
    }

    render() {
        context.save();
        context.font = this.textStyle;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.globalAlpha = this.opacity;
        context.fillText(this.text, this.x, this.y);
        context.restore();
    }

    startAnimation(dy, duration) {
        timer.tween(
            this,
            {
                opacity: 0,
                y: this.y + dy
            },
            duration,
            Easing.linear,
            () => {
                this.isDone = true;
            }
        )
    }
}