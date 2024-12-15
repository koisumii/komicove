export default class Day {
    /** Determines how fast time progresses. If the value is 1, 1 real second is 1 in-game second. */
    static SPEED_FACTOR = 240;
    static HOURS_IN_DAY = 24;
    static MINUTES_IN_HOUR = 60;
    static SECONDS_IN_MINUTE = 60;
    static INITIAL_HOURS = 6;
    static INITIAL_MINUTES = 0;
    static INITIAL_SECONDS = 0;

    /**
     * Represents information about a game day, including current day, current time,, should progress
     */
    constructor() {
        this.count = 1;
        this.hours = Day.INITIAL_HOURS;
        this.minutes = Day.INITIAL_MINUTES;
        this.seconds = Day.INITIAL_SECONDS;
        this.shouldProgress = false;
    }

    /**
     * Proceeds to the next day.
     */
    progress() {
        this.count++;
        this.hours = Day.INITIAL_HOURS;
        this.minutes = Day.INITIAL_MINUTES;
        this.seconds = Day.INITIAL_SECONDS;
        this.shouldProgress = false;
    }

    update(dt) {
        this.updateTime(dt);

        if (this.hours >= Day.HOURS_IN_DAY)
            this.shouldProgress = true;
    }

    updateTime(dt) {
        this.seconds += dt * Day.SPEED_FACTOR;

        while (this.seconds >= Day.SECONDS_IN_MINUTE) {
            this.seconds -= Day.SECONDS_IN_MINUTE;
            this.minutes++;
        }

        while (this.minutes >= Day.MINUTES_IN_HOUR) {
            this.minutes -= Day.MINUTES_IN_HOUR;
            this.hours++;
        }
    }

    getTime() {
        return `${this.hours.toString().padStart(2, "0")}:${(Math.floor(this.minutes / 10) * 10).toString().padStart(2, "0")}`;
    }
}