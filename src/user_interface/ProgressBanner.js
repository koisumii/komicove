import { CANVAS_HEIGHT, context, timer } from "../globals.js";
import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import Easing from "../../lib/Easing.js";
import Colour from "../enums/Colour.js";

export default class ProgressBanner {
    static DURATION = 5; // The time duration for which the banner will remain on screen statically
    static FADE_IN_DURATION = 0.5; // The time duration it takes for the banner to fade in.
    static FADE_OUT_DURATION = 0.5; // The time duration it takes for the banner to fade out.
    static FADE_IN_DY = -40; // The distance for which the banner will travel vertically as it fades in
    static FADE_OUT_DY = -40; // The distance for which the banner will travel vertically as it fades out
    static GAP = 10; // The gap between the icon and the piece of text.
    static PADDING = 10;
    static RADIUS = 4;

    /**
     * A banner displayed at the bottom left corner for indication of new progress.
     * @param {Sprite} icon The icon of the banner.
     * @param {string} text The text of the banner.
     */
    constructor(icon, text, textStyle) {
        this.icon = icon;
        this.text = text;
        this.textStyle = textStyle;
        this.opacity = 0;
        this.isDone = false;

        context.save();
        context.font = this.textStyle;
        const metrics = context.measureText(text);
        context.restore();

        const imageHeight = icon.height;
        const textHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;


        this.width = metrics.width + this.icon.width + ProgressBanner.GAP + ProgressBanner.PADDING * 2;
        this.height = Math.max(imageHeight, textHeight) + ProgressBanner.PADDING * 2;

        this.x = 20;
        this.y = CANVAS_HEIGHT - 20 - this.height - ProgressBanner.FADE_IN_DY;

        this.iconOffset = new Vector(ProgressBanner.PADDING, ProgressBanner.PADDING);
        this.textOffset = new Vector(ProgressBanner.PADDING + this.icon.width + ProgressBanner.GAP, ProgressBanner.PADDING);

        const imageTextHeightDifference = Math.abs(imageHeight - textHeight);

        if (imageHeight > textHeight)
            this.textOffset.y += imageTextHeightDifference;
        else
            this.iconOffset.y += imageTextHeightDifference;

        this.fadeInAndOut();
    }

    async fadeInAndOut() {
        await this.fadeIn();
        await timer.wait(ProgressBanner.DURATION);
        await this.fadeOut();

        this.isDone = true;
    }

    async fadeIn() {
        await timer.tweenAsync(
            this,
            {
                opacity: 1,
                y: this.y + ProgressBanner.FADE_IN_DY
            },
            ProgressBanner.FADE_IN_DURATION,
            Easing.easeInQuad
        );
    }

    async fadeOut() {
        await timer.tweenAsync(
            this,
            {
                opacity: 0,
                y: this.y + ProgressBanner.FADE_OUT_DY
            },
            ProgressBanner.FADE_OUT_DURATION,
            Easing.easeInQuad
        );
    }

    render() {
        context.save();
        context.translate(this.x, this.y);
        context.globalAlpha = this.opacity;

        context.strokeStyle = Colour.White;
        context.fillStyle = Colour.Grey;
        context.beginPath();
        context.roundRect(0, 0, this.width, this.height, ProgressBanner.RADIUS);
        context.stroke();
        context.fill();
        
        this.icon.render(this.iconOffset.x, this.iconOffset.y);
        context.font = this.textStyle;
        context.fillStyle = Colour.White;
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.fillText(this.text, this.textOffset.x, this.textOffset.y);
        context.restore();
    }
}