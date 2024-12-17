import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { images, keys } from "../globals.js";
import keySpritesConfig from "../../assets/sprites_config/key_prompts.json" with { type: "json" }
import Animation from "../../lib/Animation.js";

/**
 * A helper class used to retrieve animation (flashing key) and sprites of a key prompt
 * (e.g. prompt of the G key on keyboard).
 */
export default class KeyPromptHelper {
    // Length of a grid in the key prompt spritesheet
    static GRID_LENGTH = 32;
    /**
     * Given the y coordinate of a light key sprite n,
     * the y coordinate of its dark version is n + LIGHT_DARK_Y_DIFFERENCE.
     */
    static LIGHT_DARK_Y_DIFFERENCE = 8;

    /**
     * Get the key prompt animation (flashing key) and sprites of the given key.
     * 
     * @param {string} key A key from Input.KEYS for which the corresponding sprite will be returned.
     * @param {number} animationInterval The time interval between two frames of the key.
     * @returns {object} An object containing both animations and individual frames.
     * { animation: Animation, sprites: Sprite[] }
     */
    static getAnimation(key, animationInterval) {
        if (!(key in keySpritesConfig))
            return null;

        let keySpecs = keySpritesConfig[key];

        return {
            animation: new Animation([0, 1], animationInterval),
            sprites: [
                new Sprite(
                    images.get(ImageName.KeyPrompts),
                    keySpecs.x * KeyPromptHelper.GRID_LENGTH,
                    keySpecs.y * KeyPromptHelper.GRID_LENGTH,
                    keySpecs.width * KeyPromptHelper.GRID_LENGTH,
                    keySpecs.height * KeyPromptHelper.GRID_LENGTH
                ),
                new Sprite(
                    images.get(ImageName.KeyPrompts),
                    keySpecs.x * KeyPromptHelper.GRID_LENGTH,
                    (keySpecs.y + this.LIGHT_DARK_Y_DIFFERENCE) * KeyPromptHelper.GRID_LENGTH,
                    keySpecs.width * KeyPromptHelper.GRID_LENGTH,
                    keySpecs.height * KeyPromptHelper.GRID_LENGTH
                )
            ]
        };
    }
}