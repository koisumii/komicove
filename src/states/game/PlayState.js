import State from "../../../lib/State.js";
import SoundName from "../../enums/SoundName.js";
import { debug, sounds, stateMachine } from "../../globals.js";
import Map from "../../services/Map.js";
import Player from "../../entities/Player.js";
import Vector from "../../../lib/Vector.js";
import GameEntity from "../../entities/GameEntity.js";
import Day from "../../services/Day.js";
import UserInterface from "../../services/UserInterface.js";
import GameStateName from "../../enums/GameStateName.js";
import { TransitionType } from "./TransitionState.js";

export default class PlayState extends State {
	/**
	 * The state where actual gameplay (player walking around & fishing) takes place.
	 */
	constructor() {
		super();

		/** @type {Map?} */
		this.map = null;

		/** @type {Player?} */
		this.player = null;

		/** @type {GameEntity[]} */
		this.entities = [];

		/** @type {Day?} */
		this.day = null;

		this.userInterface = new UserInterface(this);

		// the amount of score required to proceed to the next day
		this.scoreThreshold = 0;
	}

	enter(params) {
		this.map = params.map;
		this.day = params.day;
		this.player = params.player;

		this.entities = [params.player];
		this.scoreThreshold = this.calculateScoreThreshold(this.day?.count);
		sounds.play(SoundName.AtTheEndOfAllThings);
	}

	calculateScoreThreshold(day) {
		return day * 100;
	}

	update(dt) {
		debug.update();
		this.map?.update(dt);

		this.entities.forEach((entity) => entity.update(dt));

		this.day?.update(dt);

		// If current day ended
		if (this.day?.shouldProgress) {
			sounds.stop(SoundName.AtTheEndOfAllThings);

			// If the score threshold isn't reached
			if (this.player !== null && this.player.score < this.scoreThreshold) {
				// Game Over
				stateMachine.change(GameStateName.Transition, {
					source: stateMachine.currentState,
					destination: GameStateName.GameOver,
					type: TransitionType.FadeOut,
					params: {
						day: this.day.count,
						score: this.player.totalScore
					}
				});
			} else {
				// Victory (moving on to the next day)
				stateMachine.change(GameStateName.Transition, {
					source: stateMachine.currentState,
					destination: GameStateName.Victory,
					type: TransitionType.FadeOut,
					params: {
						map: this.map,
						day: this.day,
						player: this.player,
						scoreThreshold: this.scoreThreshold
					}
				});
			}
		}
	}

	render() {
		this.map?.render();

		this.entities.forEach((entity) => entity.render());

		this.userInterface.render();
	}
}
