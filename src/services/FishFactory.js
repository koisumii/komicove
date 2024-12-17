import CommonFish from "../entities/CommonFish.js";
import LegendaryFish from "../entities/LegendaryFish.js";
import RareFish from "../entities/RareFish.js";
import ImageName from "../enums/ImageName.js";

export default class FishFactory {
    static COMMON_FISH_IMAGES = [
        ImageName.FishAnchovy,
        ImageName.FishBarbel,
        ImageName.FishBitterling,
        ImageName.FishCarp,
        ImageName.FishCatfish,
        ImageName.FishCrucianCarp,
        ImageName.FishFlounder,
        ImageName.FishGoldfish,
        ImageName.FishKillifish,
        ImageName.FishLoach,
        ImageName.FishMinnow,
        ImageName.FishRicefish,
        ImageName.FishSmallmouthBass,
        ImageName.FishSmelt,
        ImageName.FishStickleback,
        ImageName.FishStrupedShiner,
        ImageName.FishSweetfish,
        ImageName.FishTadpole,
        ImageName.FishTuna
    ];

    static RARE_FISH_IMAGES = [
        ImageName.FishArapaima,
        ImageName.FishClownish,
        ImageName.FishDorado,
        ImageName.FishGiantTrevallry,
        ImageName.FishGoby,
        ImageName.FishGuppy,
        ImageName.FishKoi,
        ImageName.FishMoonfish,
        ImageName.FishMorayEel,
        ImageName.FishNeotropicalSilverside,
        ImageName.FishPaleChub,
        ImageName.FishTilapia,
        ImageName.FishWalleye
    ]

    static LEGENDARY_FISH_IMAGES = [
        ImageName.FishAngelFish,
        ImageName.FishArowana,
        ImageName.FishBetta,
        ImageName.FishBlueMarlin,
        ImageName.FishCoelacanth,
        ImageName.FishJapaneseLates,
        ImageName.FishKingCrab,
        ImageName.FishLowlandCichlid,
        ImageName.FishMahiMahi,
        ImageName.FishRainbowfish,
        ImageName.FishSturgeon,
        ImageName.FishWhiteSpottedChar
    ]

    static createFish() {
        const random = Math.random();

        if(random < 0.6) {
            const image = this.randomImage(this.COMMON_FISH_IMAGES);
            return new CommonFish('Common Fish', 5, image);
        } else if (random < 0.9) {
            const image = this.randomImage(this.RARE_FISH_IMAGES);
            return new RareFish('Rare Fish', 10, image);
        } else {
            const image = this.randomImage(this.LEGENDARY_FISH_IMAGES);
            return new LegendaryFish('Legendary Fish', 25, image);
        }
    }

    static randomImage(imageArray){
        const randomIndex = Math.floor(Math.random() * imageArray.length);
        return imageArray[randomIndex];
    }
}