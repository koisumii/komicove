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
	}

	enter() {
		switch (this.player.direction) {
			case Direction.Down:
				this.player.currentAnimation = this.player.animations["idle-s"];
				break;
			case Direction.Right:
				this.player.currentAnimation = this.player.animations["idle-se"];
				break;
			case Direction.Up:
				this.player.currentAnimation = this.player.animations["idle-n"];
				break;
			case Direction.Left:
				this.player.currentAnimation = this.player.animations["idle-se"];
				break;
		}
	}

	/**
	 * 
	 * @returns If the player can move. (the player cannot move if horizontal direction is changed)
	 */
	update() {

		if(this.player.handleCasting()){
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
