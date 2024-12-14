import Animation from '../../../lib/Animation.js';
import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import Direction from '../../enums/Direction.js';
import PlayerStateName from '../../enums/PlayerStateName.js';
import { input } from '../../globals.js';
import Input from '../../../lib/Input.js';

export default class PlayerIdlingState extends State {
	/**
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
		this.animation = new Animation([7], 1);
	}

	enter() {
		this.player.currentAnimation = this.animation;
	}

	/**
	 * 
	 * @returns If the player can move. (the player cannot move if horizontal direction is changed)
	 */
	update() {
		if (input.isKeyHeld(Input.KEYS.D) && this.player.horizontalDirection !== Direction.Right) {
			this.player.horizontalDirection = Direction.Right;
			input.keysPressed[Input.KEYS.D] = false;
			return;
		}

		if (input.isKeyHeld(Input.KEYS.A) && this.player.horizontalDirection !== Direction.Left) {
			this.player.horizontalDirection = Direction.Left;
			input.keysPressed[Input.KEYS.A] = false;
			return;
		}

		if (input.isKeyPressed(Input.KEYS.S)) {
			this.player.direction = Direction.Down;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.D)) {
			this.player.direction = Direction.Right;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.W)) {
			this.player.direction = Direction.Up;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.A)) {
			this.player.direction = Direction.Left;
			this.player.changeState(PlayerStateName.Walking);
		}
	}
}
