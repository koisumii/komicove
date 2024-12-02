import Input from "../../lib/Input.js";
import State from "../../lib/State.js";
import GameStateName from "../enums/GameStateName.js";
import ImageName from "../enums/ImageName.js";
import SoundName from "../enums/SoundName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, input, sounds, stateMachine } from "../globals.js";
import { TransitionType } from "./TransitionState.js";

export default class TitleScreenState extends State {
	constructor() {
		super();
	}

	enter() {
		sounds.play(SoundName.AtTheEndOfAllThings);
	}

	exit() {
		sounds.pause(SoundName.AtTheEndOfAllThings);
		sounds.play(SoundName.ReverseCymbal);
	}

	update(dt) {
		if (input.isKeyPressed(Input.KEYS.ENTER)) {
			stateMachine.change(GameStateName.Transition, {
				source: stateMachine.currentState,
				destination: GameStateName.Play,
				type: TransitionType.FadeOut
			});
		}
	}

	render() {
		context.save();
		context.filter = 'brightness(50%)';
		images.render(ImageName.Background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.restore();
		context.font = '60px StardewValley';
		context.fillStyle = 'white';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('KomíCove', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3);
		context.font = '16px Roboto';
		context.fillText(
			'Press Enter to Begin',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 40
		);
	}
}
