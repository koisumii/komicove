import StateMachine from "../../lib/StateMachine.js";
import Vector from "../../lib/Vector.js";
import Map from "../services/Map.js";
import GameEntity from "./GameEntity.js";
import PlayerStateName from "../enums/PlayerStateName.js";
import Sprite from "../../lib/Sprite.js";
import { context, images } from "../globals.js";
import ImageName from "../enums/ImageName.js";
import PlayerIdlingState from "../states/player/PlayerIdlingState.js";
import PlayerWalkingState from "../states/player/PlayerWalkingState.js";
import Direction from "../enums/Direction.js";

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
        this.stateMachine = this.initializeStateMachine();

        this.walkingSprites = Sprite.generateSpritesFromSpriteSheet(
            images.get(ImageName.PlayerWalk),
            GameEntity.WIDTH,
            GameEntity.HEIGHT
        );

        // by default shouldFlip is false and the player faces right, used for sprite rendering
        this.shouldFlip = false;
        this.horizontalDirection = Direction.Right;
        this.sprites = this.walkingSprites;

        this.score = 0;
        this.totalScore = 0;
    }

    addScore(amount) {
        this.score += amount;
        this.totalScore += amount;
    }

    update(dt) {
        super.update(dt);
        this.shouldFlip = this.horizontalDirection !== Direction.Right;
    }

    render() {
        const x = Math.floor(this.canvasPosition.x);
        const y = Math.floor(this.canvasPosition.y - this.dimensions.y / 3);

        if (this.shouldFlip) {
            context.save();
            context.scale(-1, 1);
            super.render(-x - GameEntity.WIDTH, y);
            context.restore();
        }
        else {
            super.render(x, y);
        }
    }

    initializeStateMachine() {
        const stateMachine = new StateMachine();

        stateMachine.add(PlayerStateName.Idling, new PlayerIdlingState(this));
        stateMachine.add(PlayerStateName.Walking, new PlayerWalkingState(this));

        stateMachine.change(PlayerStateName.Idling);

        return stateMachine;
    }
}