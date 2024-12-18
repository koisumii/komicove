import FishingRod from "./FishingRod.js";
import ImageName from "../enums/ImageName.js";
import Colour from "../enums/Colour.js";

export default class CastingRod extends FishingRod {
    constructor() {
        super('casting rod', 3, ImageName.CastingRod, Colour.DeepSkyBlue, 2);
    }
}