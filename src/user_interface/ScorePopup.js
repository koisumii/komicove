import Easing from "../../lib/Easing.js";
import { context, timer } from "../globals.js";

export default class ScorePopup {
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