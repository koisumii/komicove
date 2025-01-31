import State from "../../../lib/State.js";
import SoundName from "../../enums/SoundName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, debug, input, sounds, stateMachine } from "../../globals.js";
import Map from "../../services/Map.js";
import Player from "../../entities/Player.js";
import GameEntity from "../../entities/GameEntity.js";
import Day from "../../services/Day.js";
import UserInterface from "../../user_interface/UserInterface.js";
import GameStateName from "../../enums/GameStateName.js";
import { TransitionType } from "./TransitionState.js";
import Input from "../../../lib/Input.js";
import MenuState from "./MenuState.js";

export default class PlayState extends State {
	/**
	 * @type {PlayState}
	 */
	static instance;
	/**
	 * The state where actual gameplay (player walking around & fishing) takes place.
	 */
	constructor() {
		super();

		PlayState.instance = this;
		/** @type {Map?} */
		this.map = null;

		/** @type {Player?} */
		this.player = null;

		/** @type {GameEntity[]} */
		this.entities = [];

		/** @type {Day?} */
		this.day = null;

		/** @type {UserInterface?} */
		this.userInterface = null;

		// the amount of score required to proceed to the next day
		this.scoreThreshold = 0;
	}

	enter(params) {
		this.map = params.map;
		this.day = params.day;
		this.player = params.player;

		this.userInterface = new UserInterface(this, Input.KEYS.SPACE);
		this.entities = [params.player];
		this.scoreThreshold = this.calculateScoreThreshold(this.day?.count);
		sounds.play(SoundName.AtTheEndOfAllThings);

		this.scoreThresholdReached = false;

		if (this.player !== null)
			this.scoreThresholdReached = this.player?.score >= this.scoreThreshold;
	}

	calculateScoreThreshold(day) {
		return day * 100;
	}

	update(dt) {
		if (input.isKeyPressed(MenuState.PAUSE_KEY)) {
			// input.keys[MenuState.PAUSE_KEY] = false;
			stateMachine.change(
				GameStateName.Menu,
				{
					map: this.map,
					day: this.day,
					player: this.player
				}
			);
		}

		debug.update();
		this.userInterface?.update(dt);
		this.map?.update(dt);

		this.entities.forEach((entity) => entity.update(dt));

		this.day?.update(dt);

		if (!this.scoreThresholdReached && this.player !== null) {
			if (this.player.score >= this.scoreThreshold) {
				this.scoreThresholdReached = true;
				sounds.play(SoundName.Checkmark);
			}
		}

		// If current day ended
		if (this.day?.shouldProgress) {
			sounds.stop(SoundName.AtTheEndOfAllThings);

			// If the score threshold isn't reached
			if (!this.scoreThresholdReached && this.player !== null) {
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

		this.applyNightFilter();

		this.userInterface?.render();
	}

	applyNightFilter() {
		if (this.day !== null) {
			context.save();
			context.fillStyle = `rgba(0, 0, 50, ${this.day.getDarknessLevel() * 0.4})`;
			context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			context.restore();
		}
	}
}
