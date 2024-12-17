import Animation from "../../lib/Animation.js";
import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import { context } from "../globals.js";
import KeyPromptHelper from "./KeyPromptHelper.js";

export default class KeyPrompt {
    /**
     * An UI element that prompts the player to press a key (includes text and the key image).
     * @param {string} key The key to prompt the player about, taken from Input.KEYS.
     * @param {string} textStyle The desired text style for prompt rendering, CanvasRenderingContext2D::font.
     * @param {string} prefixText The text to display before the key iamge.
     */
    constructor(key, textStyle, animationInterval = 0.25, prefixText = 'Press ') {
        this.isVisible = false;

        const { animation, sprites } = KeyPromptHelper.getAnimation(key, animationInterval);
        /** @type {Animation} */
        this.animation = animation;
        /** @type {Sprite[]} */
        this.sprites = sprites;

        this.prefixText = prefixText;
        this.textStyle = textStyle;

        context.save();
        context.font = this.textStyle;
        this.textWidth = context.measureText(this.prefixText).width;
        context.restore();

        this.position = new Vector(0, 0);
        this.dimensions = new Vector(this.textWidth + this.sprites[0].width, this.sprites[0].height);
    }

    update(dt) {
        this.animation.update(dt);
    }

    render() {
        if (!this.isVisible)
            return;

        context.save();

        context.textBaseline = 'middle';
        context.textAlign = 'left';
        context.fillText(this.prefixText, this.position.x, this.position.y + this.dimensions.y / 2);


        const currentFrame = this.animation.getCurrentFrame();
        // If current frame is the dark key sprite, render it at a slightly lower position
        // to create the effect of key being pressed down
        const spriteOffsetY = currentFrame === 1 ? 2 : 0;

        this.sprites[currentFrame]
            .render(this.position.x + this.textWidth + 20, this.position.y + spriteOffsetY);
        context.restore();
    }
}