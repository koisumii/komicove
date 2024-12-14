import State from "../../../lib/State.js";
import SoundName from "../../enums/SoundName.js";
import { debug, sounds } from "../../globals.js";
import Map from "../../services/Map.js";
import Player from "../../entities/Player.js";
import Vector from "../../../lib/Vector.js";

export default class PlayState extends State {
	/**
	 * @type {PlayState}
	 */
	static instance;
	constructor(mapDefinition) {
		super();
		PlayState.instance = this;

		this.map = new Map(mapDefinition);
		this.player = new Player(this.map, new Vector(5, 5));
		this.entities = [this.player];
	}

	enter() {
		sounds.play(SoundName.AtTheEndOfAllThings);
	}

	update(dt) {
		debug.update();
		this.map?.update(dt);

		this.entities.forEach((entity) => entity.update(dt));
	}

	render() {
		this.map?.render();

		this.entities.forEach((entity) => entity.render());
	}
}
