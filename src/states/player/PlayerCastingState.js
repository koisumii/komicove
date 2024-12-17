import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import PlayerStateName from '../../enums/PlayerStateName.js';
import SoundName from '../../enums/SoundName.js';
import { sounds, timer } from '../../globals.js';


export default class PlayerCastingState extends State {
    /**
     * @param {Player} player
     */
    constructor(player) {
        super();
        this.player = player;
    }

    enter() {
        this.player.currentAnimation = this.player.animations["casting"];
        this.player.currentAnimation?.refresh();
        // @ts-ignore
        this.player.currentAnimation.cycles = 1;

        this.playSoundEffects();
    }

    async playSoundEffects() {
        sounds.play(SoundName.Swish);
        sounds.play(SoundName.ItemEquip);

        await timer.wait(1.2);
        sounds.play(SoundName.Splash);
    }

    update() {
        // @ts-ignore
        if (this.player.currentAnimation?.isDone()) {
            this.player.changeState(PlayerStateName.FishingIdle);
        }
    }
}