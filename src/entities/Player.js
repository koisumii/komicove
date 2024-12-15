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
import meta from '../../assets/images/sunnyside_world_chatacter_anim_human_v1.0.json' with { type: "json" };
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
        this.stateMachine = this.initializeStateMachine();

        const {animations, frames} = Sprite.generateAnimationsFromMeta(meta, 'player');
        this.animations = animations;
        this.sprites = frames;

        // Set the default animation frames for walking
        this.currentAnimation = this.animations["walk-s"];

        // by default shouldFlip is false and the player faces right, used for sprite rendering
        this.shouldFlip = false;
        this.horizontalDirection = Direction.Right;
    }

    update(dt) {
        super.update(dt);
        this.shouldFlip = this.horizontalDirection !== Direction.Right;
    }

    render() {
        const frame = this.currentAnimation.getCurrentFrame(); 
        const sprite = this.sprites[frame]; 
    
        const offsetX = sprite.width / 2; 
        const offsetY = sprite.height / 2; 
    
        let x = Math.floor(this.canvasPosition.x - offsetX + Tile.SIZE / 2);
        let y = Math.floor(this.canvasPosition.y - offsetY + Tile.SIZE / 2);
    
        context.save();

        if (this.shouldFlip) {
            context.translate(x + sprite.width, y); // move the origin to where the sprite should flip..
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