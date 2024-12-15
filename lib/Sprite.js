import { images } from "../src/globals.js";
import Graphic from "./Graphic.js";
import Animation from "./Animation.js";

export default class Sprite {
	/**
	 * Represents a Graphic from a sprite sheet that will be drawn on the canvas.
	 *
	 * @param {Graphic} graphic
	 * @param {number} x The X coordinate of the Sprite in the Sprite sheet.
	 * @param {number} y The X coordinate of the Sprite in the Sprite sheet.
	 * @param {number} width
	 * @param {number} height
	 */
	constructor(graphic, x = 0, y = 0, width, height) {
		this.graphic = graphic;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	/**
	 * Draws the Sprite onto the canvas.
	 *
	 * @param {number} canvasX The X coordinate of where the Sprite will be drawn on the canvas.
	 * @param {number} canvasY The Y coordinate of where the Sprite will be drawn on the canvas.
	 * @param {object} scale Can be used to draw the Sprite bigger or smaller.
	 */
	render(canvasX, canvasY, scale = { x: 1, y: 1 }) {
		this.graphic.context.drawImage(
			this.graphic.image,
			this.x,
			this.y,
			this.width,
			this.height,
			canvasX,
			canvasY,
			this.width * scale.x,
			this.height * scale.y,
		);
	}

	/**
	 * This function assumes that every individual sprite in the specified
	 * sprite sheet is the exact same width and height. The sprites also must
	 * be laid out in a grid where the grid dimensions are tileWidth x tileHeight.
	 *
	 * @param {Graphic} spriteSheet
	 * @param {number} tileWidth
	 * @param {number} tileHeight
	 * @returns
	 */
	static generateSpritesFromSpriteSheet(spriteSheet, tileWidth, tileHeight) {
		const sprites = [];
		const sheetWidth = spriteSheet.width / tileWidth;
		const sheetHeight = spriteSheet.height / tileHeight;

		for (let y = 0; y < sheetHeight; y++) {
			for (let x = 0; x < sheetWidth; x++) {
				sprites.push(new Sprite(spriteSheet, x * tileWidth, y * tileHeight, tileWidth, tileHeight));
			}
		}

		return sprites;
	}

	/**
	 * Generates animations and individual sprites from JSON meta data.
	 * 
	 * @param {Object} meta - The meta object from the JSON.
	 * @param {string} spriteSheet - The sprite sheet graphic.
	 * @returns {Object} - An object containing both animations and individual frames.
	 * { animations: { [name]: frames[] }, frames: Sprite[] }
	 */
	static generateAnimationsFromMeta(meta, spriteSheet) {
		const animations = {};
		const frames = [];

		Object.values(meta.frames).forEach(frame => {
			frames.push(
				new Sprite(
					images.get(spriteSheet),
					frame.frame.x,
					frame.frame.y,
					frame.frame.w,
					frame.frame.h
				)
			);
		});

        meta.meta.frameTags.forEach(tag => {
            const frameIndices = [];
            for (let i = tag.from; i <= tag.to; i++) {
                frameIndices.push(i); 
            }

            animations[tag.name] = new Animation(frameIndices, 0.15); 
        });
		
		return {
			animations,
			frames
		};
	}
}
