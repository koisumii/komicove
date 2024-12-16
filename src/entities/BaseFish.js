import Sprite from "../../lib/Sprite.js";
import { images } from "../globals.js";

export default class BaseFish {
    constructor(name, hp, ImageName) {
        this.name = name;
        this.hp = hp;
        this.sprite = new Sprite(
            images.get(ImageName),
            0, 
            0,
            images.get(ImageName).width,
            images.get(ImageName).height
        )
    }

    render(x, y){
        const offsetX = this.sprite.width / 2;
        const offsetY = this.sprite.height / 2;

        this.sprite.render(x - offsetX, y - offsetY);
    }

    /**@abstract */
    getScore(){
    }
}