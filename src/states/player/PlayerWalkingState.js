import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import Direction from '../../enums/Direction.js';
import PlayerStateName from '../../enums/PlayerStateName.js';
import Input from '../../../lib/Input.js';
import { input, sounds, timer } from '../../globals.js';
import Tile from '../../services/Tile.js';
import Easing from '../../../lib/Easing.js';
import GameEntity from '../../entities/GameEntity.js';
import SoundName from '../../enums/SoundName.js';

export default class PlayerWalkingState extends State {
    /**
     *
     * @param {Player} player
     */
    constructor(player) {
        super();

        this.player = player;
        this.bottomLayer = this.player.map.bottomLayer;
        this.collisionLayer = this.player.map.collisionLayer;
        /*
            https://stackoverflow.com/a/10050831/23561820 
            [...Array(4).keys()]; => [0, 1, 2, 3]
         */
        // this.animation = new Animation([...Array(8).keys()], 0.15);

        this.isMoving = false;
    }

    update(dt) {
        this.player.currentAnimation?.update(dt);

        this.handleMovement();
    }

    handleMovement() {
        if (this.isMoving) {
            return;
        }

        if (
            !input.isKeyHeld(Input.KEYS.W) &&
            !input.isKeyHeld(Input.KEYS.A) &&
            !input.isKeyHeld(Input.KEYS.S) &&
            !input.isKeyHeld(Input.KEYS.D)
        ) {
            this.player.changeState(PlayerStateName.Idling);
            return;
        }

        this.updateDirection();
        this.move();
    }

    updateDirection() {
        if (input.isKeyHeld(Input.KEYS.S)) {
            this.player.direction = Direction.Down;
            this.player.currentAnimation = this.player.animations["walk-s"];
        } else if (input.isKeyHeld(Input.KEYS.D)) {
            this.player.direction = Direction.Right;
            this.player.currentAnimation = this.player.animations["walk"];
        } else if (input.isKeyHeld(Input.KEYS.W)) {
            this.player.direction = Direction.Up;
            this.player.currentAnimation = this.player.animations["walk-n"];
        } else if (input.isKeyHeld(Input.KEYS.A)) {
            this.player.direction = Direction.Left;
            this.player.currentAnimation = this.player.animations["walk"];
        }
    }

    move() {
        let x = this.player.position.x;
        let y = this.player.position.y;

        switch (this.player.direction) {
            case Direction.Up:
                y--;
                break;
            case Direction.Down:
                y++;
                break;
            case Direction.Left:
                x--;
                break;
            case Direction.Right:
                x++;
                break;
        }

        if (!this.isValidMove(x, y)) {
            return;
        }

        sounds.play(SoundName.GrassWalk);

        this.player.position.x = x;
        this.player.position.y = y;

        this.tweenMovement(x, y);
    }

    tweenMovement(x, y) {
        this.isMoving = true;

        timer.tween(
            this.player.canvasPosition,
            { x: x * Tile.SIZE + GameEntity.WIDTH / 2, y: y * Tile.SIZE + GameEntity.HEIGHT / 2 },
            0.25,
            Easing.linear,
            () => {
                this.isMoving = false;

                this.updateDirection();
            }
        );
    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns Whether the player is going to move on to a non-collidable tile.
     */
    isValidMove(x, y) {
        return this.collisionLayer.getTile(x, y) === null;
    }
}
