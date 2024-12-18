import TelescopicRod from "../objects/TelescopicRod.js";
import SpinningRod from "../objects/SpinningRod.js";
import CastingRod from "../objects/CastingRod.js";
import FlyRod from "../objects/FlyRod.js";
import FishingRod from "../objects/FishingRod.js";


export default class FishingRodFactory {
    static MAX_TIER = 3;
    
    /**
     * 
     * @param {number} tier 
     * @returns {FishingRod?}
     */
    static createInstance(tier) {
        switch (tier) {
            case 0:
                return new CastingRod();
            case 1:
                return new FlyRod();
            case 2:
                return new SpinningRod();
            case 3:
                return new TelescopicRod();
            default:
                return null;
        }
    }
}