import Input from "../../../lib/Input.js";
import State from "../../../lib/State.js";
import GameStateName from "../../enums/GameStateName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, input, stateMachine } from "../../globals.js";
import { TransitionType } from "./TransitionState.js";

export default class GameOverState extends State {
	constructor() {
		super();

		/**
		 * @type {number?}
		 */
		this.day = null;

		/**
		 * @type {number?}
		 */
		this.score = null;
	}

	enter(params) {
		this.day = params.day;
		this.score = params.score;
	}

	update(dt) {
		if (input.isKeyPressed(Input.KEYS.ENTER)) {
			stateMachine.change(GameStateName.Transition, {
				source: stateMachine.currentState,
				destination: GameStateName.TitleScreen,
				type: TransitionType.FadeOut
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
		context.fillText(`Game Over!`, CANVAS_WIDTH / 2, y);

		y = CANVAS_HEIGHT / 2;

		context.font = '16px Roboto';
		context.fillText(`Survived - ${this.day} days`, CANVAS_WIDTH / 2, y);
		y += 24;
		context.fillText(`Earned - ${this.score} points`, CANVAS_WIDTH / 2, y);

		context.fillText(`Press Enter to Play Again`, CANVAS_WIDTH / 2, CANVAS_HEIGHT * 3 / 4);

		context.restore();
	}
}
