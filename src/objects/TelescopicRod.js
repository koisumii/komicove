import FishingRod from "./FishingRod.js";
import ImageName from "../enums/ImageName.js";
import Colour from "../enums/Colour.js";

export default class TelescopicRod extends FishingRod {
    constructor() {
        super('telescopic rod', 100, ImageName.TelescopicRod, Colour.DarkViolet, 3);
    }
}