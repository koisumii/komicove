import FishingRod from "./FishingRod.js";
import ImageName from "../enums/ImageName.js";
import Colour from "../enums/Colour.js";

export default class FlyRod extends FishingRod {
    constructor() {
        super('fly rod', 10, ImageName.FlyRod, Colour.DarkViolet, 3);
    }
}