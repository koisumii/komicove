import BaseFish from './BaseFish.js';

export default class RareFish extends BaseFish {
    constructor(name, hp, ImageName) {
        super(name, hp, ImageName);
    }

    getScore() {
        return 10;
    }
}