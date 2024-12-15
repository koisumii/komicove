import Easing from "../../../lib/Easing.js";
import State from "../../../lib/State.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, stateMachine, timer } from "../../globals.js";

export const TransitionType = {
    FadeIn: 0,
    FadeOut: 1
};

export default class TransitionState extends State {
    constructor() {
        super();

        this.source = null;
        this.destination = null;
        this.type = null;
        this.canvasOptions = {
            alpha: null
        };
        this.params = null;
    }

    enter(parameters) {
        this.source = parameters.source;
        this.destination = parameters.destination;
        this.callback = parameters.callback;
        if (parameters.params !== undefined)
            this.params = parameters.params;

        switch (parameters.type) {
            case TransitionType.FadeIn:
                this.startTransition(1, 0);
                break;
            case TransitionType.FadeOut:
                this.startTransition(0, 1);
                break;
        }
    }

    render() {
        this.source.render();
        context.fillStyle = `rgb(255, 255, 255, ${this.canvasOptions.alpha})`;
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    startTransition(startAlpha, endAlpha) {
        this.canvasOptions.alpha = startAlpha;
        timer.tween(this.canvasOptions,
            {
                alpha: endAlpha
            },
            1.5,
            Easing.linear,
            () => {
                if (this.callback !== undefined)
                    this.callback();
                
                stateMachine.change(this.destination, this.params);
            });
    }
}