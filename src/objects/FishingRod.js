import Sprite from "../../lib/Sprite.js";
import { images } from "../globals.js";

export default class FishingRod {
    /**
     * The base class of all fishing rods.
     * @param {string} name The name of the fishing rod.
     * @param {number} luckMultiplier The multiplier of luck applied to fishing with this rod.
     * @param {string} imageName The name of the fishing rod image.
     * @param {string} color The color of the fishing rod based on rarity (e.g. green -> uncommon).
     * @param {number} tier The number that represents tier of the fishing rod (the higher the better).
     */
    constructor(name, luckMultiplier, imageName, color, tier) {
        this.name = name;
        this.luckMultiplier = luckMultiplier;
        this.sprite = new Sprite(
            images.get(imageName),
            0,
            0,
            images.get(imageName).width,
            images.get(imageName).height
        );
        this.color = color;
        this.tier = tier;
    }
}