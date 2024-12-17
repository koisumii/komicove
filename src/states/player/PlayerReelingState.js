import Input from '../../../lib/Input.js';
import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import PlayerStateName from '../../enums/PlayerStateName.js';
import { input } from '../../globals.js';
import PlayState from '../game/PlayState.js';

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

        if(this.player.fish){
            PlayState.instance.userInterface.showFishingBar(this.player.fish.hp);
        }

        PlayState.instance.userInterface.showKeyPrompt();
    }

    update() {

        if(this.player.fish === null) {
            throw Error("Fish should not be null in Reeling State.")
        }

        if(this.player.fish.hp > 0 && input.isKeyPressed(Input.KEYS.SPACE)){
            this.player.fish.hp--;
            PlayState.instance.userInterface.updateFishingBar(this.player.fish.hp)
        }

        if(this.player.fish.hp === 0){
            this.player.changeState(PlayerStateName.Carrying);
            PlayState.instance.userInterface.hideKeyPrompt();
            PlayState.instance.userInterface.hideFishingBar();
        }
    }
}