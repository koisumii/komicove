import StateMachine from "../../lib/StateMachine.js";
import Vector from "../../lib/Vector.js";
import Map from "../services/Map.js";
import GameEntity from "./GameEntity.js";
import PlayerStateName from "../enums/PlayerStateName.js";
import Sprite from "../../lib/Sprite.js";
import { context } from "../globals.js";
import PlayerIdlingState from "../states/player/PlayerIdlingState.js";
import PlayerWalkingState from "../states/player/PlayerWalkingState.js";
import Direction from "../enums/Direction.js";
import meta from '../../assets/sprites_config/sunnyside_world_chatacter_anim_human_v1.0.json' with { type: "json" };
import Tile from "../services/Tile.js";

export default class Player extends GameEntity {
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

        this.score = 0;
        this.totalScore = 0;
    }

    addScore(amount) {
        this.score += amount;
        this.totalScore += amount;
    }

    update(dt) {
        super.update(dt);
        this.shouldFlip = this.direction !== Direction.Right;
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
    }


    initializeStateMachine() {
        const stateMachine = new StateMachine();

        stateMachine.add(PlayerStateName.Idling, new PlayerIdlingState(this));
        stateMachine.add(PlayerStateName.Walking, new PlayerWalkingState(this));

        stateMachine.change(PlayerStateName.Idling);

        return stateMachine;
    }
}