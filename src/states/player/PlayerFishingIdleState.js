import State from '../../../lib/State.js';
import Timer from '../../../lib/Timer.js';
import Player from '../../entities/Player.js';
import PlayerStateName from '../../enums/PlayerStateName.js';
import FishFactory from '../../services/FishFactory.js';

export default class PlayerFishingIdleState extends State {
    /**
     * @param {Player} player
     */
    constructor(player) {
        super();
        this.player = player;
        this.timer = new Timer();
    }

    enter() {
        this.timer.clear();
        this.player.currentAnimation = this.player.animations["waiting"]; 
        this.timer.addTask(() => {
            this.player.fish = FishFactory.createFish(); 
            this.player.changeState(PlayerStateName.Reeling);
        }, 3);
    }

    update(dt) {
        this.timer.update(dt);
    }
}