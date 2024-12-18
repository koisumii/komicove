import FishingRod from "./FishingRod.js";
import ImageName from "../enums/ImageName.js";
import Colour from "../enums/Colour.js";

export default class SpinningRod extends FishingRod {
    constructor() {
        super('spinning rod', 1.1, ImageName.SpinningRod, Colour.DeepSkyBlue, 2);
    }
}