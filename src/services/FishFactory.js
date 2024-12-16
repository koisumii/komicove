import CommonFish from "../entities/CommonFish.js";
import ImageName from "../enums/ImageName.js";

export default class FishFactory {
    static createFish() {
        return new CommonFish('Bitterling', 5, ImageName.FishBitterling)
    }
}