import Graphic from "./Graphic.js";

export default class Images {
	constructor(context) {
		this.context = context;
		this.images = {};
	}

	load(imageDefinitions) {
		imageDefinitions.forEach((imageDefinition) => {
			this.images[imageDefinition.name] = new Graphic(
				imageDefinition.path,
				imageDefinition.width,
				imageDefinition.height,
				this.context,
			);
		});
	}

	get(name) {
		return this.images[name];
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number?} width 
	 * @param {number?} height 
	 */
	render(name, x, y, width = null, height = null) {
		const image = this.get(name);
		
		image.render(x, y, width ?? image.width, height ?? image.height);
	}
}
