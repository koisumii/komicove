import Animation from "../../lib/Animation.js";
import Sprite from "../../lib/Sprite.js";
import StateMachine from "../../lib/StateMachine.js";
import Vector from "../../lib/Vector.js";
import Direction from "../enums/Direction.js";
import Tile from "../services/Tile.js";

export default class GameEntity {
    static WIDTH = 28;
	static HEIGHT = 40;
    
    /**
     * 
     * @param {Vector} position 
     */
    constructor(position) {
        this.position = position;
        this.direction = Direction.Down;
        this.canvasPosition = new Vector(this.position.x * Tile.SIZE, this.position.y * Tile.SIZE);
        this.dimensions = new Vector();
        /** @type {StateMachine?} */
        this.stateMachine = null;
        /** @type {Sprite[]} */
        this.sprites = [];
        /**@type {Animation?} */
		this.currentAnimation = null;
    }
    
    update(dt) {
        this.stateMachine?.update(dt);
        this.currentAnimation?.update(dt);
    }

    render(x, y) {
        this.stateMachine?.render();
        this.sprites[this.currentAnimation?.getCurrentFrame()].render(x, y);
    }

    changeState(state, params) {
        this.stateMachine?.change(state, params);
    }
}