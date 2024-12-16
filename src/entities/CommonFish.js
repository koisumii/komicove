import BaseFish from './BaseFish.js';

export default class CommonFish extends BaseFish {
    constructor(name, hp, ImageName) {
        super(name, hp, ImageName);
    }

    getScore() {
        return 5;
    }
}