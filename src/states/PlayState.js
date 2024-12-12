import State from "../../lib/State.js";
import SoundName from "../enums/SoundName.js";
import { debug, sounds } from "../globals.js";
import Map from "../services/Map.js";

export default class PlayState extends State {
	constructor() {
		super();

		this.map = null;
	}

	enter(mapDefinition) {
		sounds.play(SoundName.AtTheEndOfAllThings);

		this.map = new Map(mapDefinition);
	}

	update(dt) {
		debug.update();
		this.map?.update(dt);
	}

	render() {
		this.map?.render();
	}
}
