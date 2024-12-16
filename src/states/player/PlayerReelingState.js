import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';

export default class PlayerReelingState extends State {
    /**
     * @param {Player} player
     */
    constructor(player) {
        super();
        this.player = player;
    }

    enter() {
        this.player.currentAnimation = this.player.animations["reeling"];
    }
}