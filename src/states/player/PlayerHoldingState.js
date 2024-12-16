import State from '../../../lib/State.js';
import Timer from '../../../lib/Timer.js';
import Player from '../../entities/Player.js';
import PlayerStateName from '../../enums/PlayerStateName.js';

export default class PlayerHoldingState extends State {
    /**
     * @param {Player} player
     */
    constructor(player) {
        super();
        this.player = player;
        this.timer = new Timer();
    }

    enter() {
        this.player.currentAnimation = this.player.animations["carry"];
        this.timer.clear();
        this.timer.addTask(() => {
            this.player.changeState(PlayerStateName.Idling);
        }, 2);
        this.player.addScore(this.player.fish?.getScore());
    }

    update(dt){
        this.timer.update(dt);
    }
}