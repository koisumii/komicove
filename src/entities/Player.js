import StateMachine from "../../lib/StateMachine.js";
import Vector from "../../lib/Vector.js";
import Map from "../services/Map.js";
import GameEntity from "./GameEntity.js";
import PlayerStateName from "../enums/PlayerStateName.js";
import Sprite from "../../lib/Sprite.js";
import { context, input, sounds } from "../globals.js";
import PlayerIdlingState from "../states/player/PlayerIdlingState.js";
import PlayerWalkingState from "../states/player/PlayerWalkingState.js";
import Direction from "../enums/Direction.js";
import meta from '../../assets/sprites_config/sunnyside_world_chatacter_anim_human_v1.0.json' with { type: "json" };
import PlayerCastingState from "../states/player/PlayerCastingState.js";
import Input from "../../lib/Input.js";
import PlayerFishingIdleState from "../states/player/PlayerFishingIdleState.js";
import PlayerReelingState from "../states/player/PlayerReelingState.js";
import PlayerHoldingState from "../states/player/PlayerHoldingState.js";
import BaseFish from "../objects/BaseFish.js";
import ScorePopup from "../user_interface/ScorePopup.js";
import { getRandomNumber } from "../../lib/Random.js";
import UserInterface from "../user_interface/UserInterface.js";
import SoundName from "../enums/SoundName.js";
import FishingRod from "../objects/FishingRod.js";
import FishingRodFactory from "../services/FishingRodFactory.js";
import PlayState from "../states/game/PlayState.js";
import ProgressBanner from "../user_interface/ProgressBanner.js";

export default class Player extends GameEntity {
    static FISHING_ROD_STORAGE_KEY = 'fishing_rod';

    /**
     * 
     * @param {Map} map 
     * @param {Vector} position
     */
    constructor(map, position) {
        super(position);

        this.map = map;
        this.dimensions = new Vector(GameEntity.WIDTH, GameEntity.HEIGHT);

        const { animations, frames } = Sprite.generateAnimationsFromMeta(meta, 'player');
        this.animations = animations;
        this.sprites = frames;

        this.stateMachine = this.initializeStateMachine();

        // by default shouldFlip is false and the player faces right, used for sprite rendering
        this.shouldFlip = false;

        /**@type BaseFish? */
        this.fish = null;
        this.score = 0;
        this.totalScore = 0;

        /** @type {FishingRod?} */
        this.fishingRod = Player.getFishingRod();

        // The score that needs to be reached for the next fishing rod to be acquired
        this.nextFishingRodScoreThreshold = 0;
        if (this.fishingRod !== null)
            this.nextFishingRodScoreThreshold = this.calculateNextFishingRodScoreThreshold(this.fishingRod);

        /** @type {ScorePopup[]} */
        this.scorePopups = [];
    }

    addScore(amount) {
        this.score += amount;
        this.totalScore += amount;
        this.scorePopups.push(
            new ScorePopup(
                new Vector(
                    this.canvasPosition.x + getRandomNumber(-40, 40),
                    this.canvasPosition.y + getRandomNumber(-40, 40)
                ),
                amount,
                -40,
                1.5,
                UserInterface.FONT
            )
        );
        sounds.play(SoundName.Score);

        if (this.totalScore >= this.nextFishingRodScoreThreshold) {
            this.fishingRod = FishingRodFactory.createInstance((this.fishingRod?.tier ?? 0) + 1);

            if (this.fishingRod !== null) {

                this.nextFishingRodScoreThreshold = this.calculateNextFishingRodScoreThreshold(this.fishingRod);
                localStorage.setItem(Player.FISHING_ROD_STORAGE_KEY, this.fishingRod.tier.toString());
                
                PlayState.instance.userInterface.progressBanner = new ProgressBanner(
                    this.fishingRod?.sprite,
                    "New Fishing Rod Acquired",
                    UserInterface.FONT
                )
            }
        }
    }

    update(dt) {
        super.update(dt);
        this.shouldFlip = this.direction !== Direction.Right;
        this.scorePopups = this.scorePopups.filter(scorePopup => !scorePopup.isDone);
    }

    render() {
        const frame = this.currentAnimation?.getCurrentFrame();
        const sprite = this.sprites[frame];

        const offsetX = sprite.width / 2;
        const offsetY = sprite.height / 2;

        let x = Math.floor(this.canvasPosition.x - offsetX);
        let y = Math.floor(this.canvasPosition.y - offsetY - GameEntity.HEIGHT / 3);
        // decreasing the value of y to slightly elevate the character such that
        // its bottom isn't strictly attached to bottom of the tile

        context.save();

        // If the player is facing right
        if (this.shouldFlip) {
            // Display the mirrored version of player

            /*
                coordinates before translation: (x, y)
                coordinates after translation: (-x, y)
                to display the character at the correct location (x, y), the canvas needs to be translated
            */

            context.translate(x + sprite.width, y);
            // Flip the canvas (horizontal)
            context.scale(-1, 1);
            sprite.render(0, 0);
        } else {
            sprite.render(x, y);
        }

        context.restore();

        if (this.stateMachine.currentState instanceof PlayerHoldingState) {
            this.fish?.render(this.canvasPosition.x, this.canvasPosition.y - 45);
        }

        this.scorePopups.forEach(popup => popup.render());
    }


    handleCasting() {
        // play the casting animation only if the player is facing right
        if (this.direction === Direction.Right && input.isKeyPressed(Input.KEYS.SPACE) && this.isFacingWater()) {
            this.changeState(PlayerStateName.Casting);
            return true;
        }
        return false;
    }

    isFacingWater() {
        const checkX = this.position.x + 1;
        const checkY = this.position.y;

        const waterTile = this.map.waterLayer.getTile(checkX, checkY);

        return waterTile;
    }

    initializeStateMachine() {
        const stateMachine = new StateMachine();

        stateMachine.add(PlayerStateName.Idling, new PlayerIdlingState(this));
        stateMachine.add(PlayerStateName.Walking, new PlayerWalkingState(this));
        stateMachine.add(PlayerStateName.Casting, new PlayerCastingState(this));
        stateMachine.add(PlayerStateName.Waiting, new PlayerFishingIdleState(this));
        stateMachine.add(PlayerStateName.Reeling, new PlayerReelingState(this));
        stateMachine.add(PlayerStateName.Carrying, new PlayerHoldingState(this));

        stateMachine.change(PlayerStateName.Idling);

        return stateMachine;
    }

    /**
     * 
     * @param {FishingRod} fishingRod 
     */
    calculateNextFishingRodScoreThreshold(fishingRod) {
        if (fishingRod.tier >= FishingRodFactory.MAX_TIER)
            return Infinity;

        return (fishingRod.tier + 1) * 50;
    }

    static getFishingRod() {
        const storedTier = localStorage.getItem(Player.FISHING_ROD_STORAGE_KEY);
        let tier = parseInt(storedTier ?? '');

        // If tier is a number and is within valid range
        if (!Number.isNaN(tier) && tier <= FishingRodFactory.MAX_TIER) {
            return FishingRodFactory.createInstance(tier);
        }

        localStorage.setItem(Player.FISHING_ROD_STORAGE_KEY, '0');
        return FishingRodFactory.createInstance(0);
    }
}