import Colour from "../enums/Colour.js";
import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import ImageName from "../enums/ImageName.js";
import Tile from "./Tile.js";
import Layer from "./Layer.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	DEBUG,
	images,
} from "../globals.js";

export default class Map {
	/**
	 * The collection of layers, sprites,
	 * and characters that comprises the world.
	 *
	 * @param {object} mapDefinition JSON from Tiled map editor.
	 */
	constructor(mapDefinition) {
		const sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Tiles),
			Tile.SIZE,
			Tile.SIZE,
		);

		this.backgroundLayer = new Layer(mapDefinition.layers[Layer.BACKGROUND], sprites);
		this.bottomLayer = new Layer(mapDefinition.layers[Layer.BOTTOM], sprites);
		this.collisionLayer = new Layer(mapDefinition.layers[Layer.COLLISION], sprites);
		this.topLayer = new Layer(mapDefinition.layers[Layer.TOP], sprites);
		this.waterLayer = new Layer(mapDefinition.layers[Layer.WATER], sprites);
	}

	update(dt) {
	}

	render() {
		this.backgroundLayer.render();
		this.bottomLayer.render();
		this.collisionLayer.render();
		this.topLayer.render();
		this.waterLayer.render();
	
		if (DEBUG) {
			Map.renderGrid();
		}
	}	

	/**
	 * Draws a grid of squares on the screen to help with debugging.
	 */
	static renderGrid() {
		context.save();
		context.strokeStyle = Colour.White;

		for (let y = 1; y < CANVAS_HEIGHT / Tile.SIZE; y++) {
			context.beginPath();
			context.moveTo(0, y * Tile.SIZE);
			context.lineTo(CANVAS_WIDTH, y * Tile.SIZE);
			context.closePath();
			context.stroke();

			for (let x = 1; x < CANVAS_WIDTH / Tile.SIZE; x++) {
				context.beginPath();
				context.moveTo(x * Tile.SIZE, 0);
				context.lineTo(x * Tile.SIZE, CANVAS_HEIGHT);
				context.closePath();
				context.stroke();
			}
		}

		context.restore();
	}
}
