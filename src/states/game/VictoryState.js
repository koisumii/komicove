import Input from "../../../lib/Input.js";
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import GameStateName from "../../enums/GameStateName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, input, stateMachine } from "../../globals.js";
import Day from "../../services/Day.js";
import { TransitionType } from "./TransitionState.js";

export default class VictoryState extends State {
	constructor() {
		super();

		/** @type {Day?} */
		this.day = null;

		/** @type {Player?} */
		this.player = null;

		/** @type {number?} */
		this.newScore = null;
	}

	enter(params) {
		this.map = params.map;
		this.day = params.day;
		this.player = params.player;
		this.scoreThreshold = params.scoreThreshold;
		this.newScore = params.player.score - params.scoreThreshold;
	}

	update(dt) {
		if (input.isKeyPressed(Input.KEYS.ENTER)) {
			stateMachine.change(GameStateName.Transition, {
				source: stateMachine.currentState,
				destination: GameStateName.Play,
				type: TransitionType.FadeOut,
				params: {
					map: this.map,
					day: this.day,
					player: this.player
				},
				callback: () => {
					this.day?.progress();

					if (this.player !== null && this.newScore !== null)
						this.player.score = this.newScore;
				}
			});
		}
	}

	render() {
		context.save();
		context.fillStyle = 'white';
		context.textBaseline = 'top';
		context.textAlign = 'center';

		let y = CANVAS_HEIGHT / 3;

		context.font = '32px Roboto';
		context.fillText(`Day ${this.day?.count} Passed!`, CANVAS_WIDTH / 2, y);

		y = CANVAS_HEIGHT / 2;

		context.font = '16px Roboto';
		context.fillText(`Score Earned: ${this.player?.score}`, CANVAS_WIDTH / 2, y);
		y += 24;
		context.fillText(`Score Deducted: ${this.scoreThreshold}`, CANVAS_WIDTH / 2, y);
		y += 24;
		context.fillText(`New Score: ${this.newScore}`, CANVAS_WIDTH / 2, y);

		context.fillText(`Press Enter to Continue`, CANVAS_WIDTH / 2, CANVAS_HEIGHT * 3 / 4);

		context.restore();
	}
}
