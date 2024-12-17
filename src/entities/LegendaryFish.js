import BaseFish from './BaseFish.js';

export default class LegendaryFish extends BaseFish {
    constructor(name, hp, ImageName) {
        super(name, hp, ImageName);
    }

    getScore() {
        return 25;
    }

    getWaitTime(){
        return 8;
    }
}