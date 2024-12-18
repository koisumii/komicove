import Input from "../../../lib/Input.js";
import State from "../../../lib/State.js";
import Vector from "../../../lib/Vector.js";
import Colour from "../../enums/Colour.js";
import GameStateName from "../../enums/GameStateName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, input, stateMachine } from "../../globals.js";

export default class MenuState extends State {
    static PAUSE_KEY = Input.KEYS.P;

    static MARGIN = 20;
    static PADDING = 20;
    static RADIUS = 20;
    static BORDER_WIDTH = 4;
    static FONT = '16px Roboto';

    constructor() {
        super();

        this.paragraphs = [
            'The player\'s objective is to survive for as many days as possible. ' +
            'Fishing rewards score, and rarer fishes worth more. ' +
            'Every day a certain amount of score is deducted from the current count, ' +
            'and the game continues as long as the score isn\'t negative.',

            'To fish, go to the deck and cast the fishing rod by hitting the spacebar. ' +
            'Wait for the fish to bite the hook, then spam spacebar to reel in.',

            'New fishing rods are given when certain scores are reached, ' +
            'which increase the chance of catching rarer fishes.'
        ];

        const baseX = MenuState.MARGIN + MenuState.BORDER_WIDTH + MenuState.PADDING;
        const baseY = MenuState.MARGIN + MenuState.BORDER_WIDTH + MenuState.PADDING;
        this.paragraphPositionList = [];
        this.paragraphPositionList.push(new Vector(baseX, baseY));
        this.paragraphPositionList.push(new Vector(baseX, baseY + 120));
        this.paragraphPositionList.push(new Vector(baseX, baseY + 200));

        const SPACE = (MenuState.MARGIN + MenuState.BORDER_WIDTH + MenuState.PADDING) * 2;
        this.paragraphWidth = CANVAS_WIDTH - SPACE;
    }

    enter(params) {
        this.map = params.map;
        this.day = params.day;
        this.player = params.player;
    }

    update(dt) {
        if (input.isKeyPressed(MenuState.PAUSE_KEY)) {
            stateMachine.change(GameStateName.Play,
                {
                    map: this.map,
                    day: this.day,
                    player: this.player
                }
            )
        }
    }

    render() {
        context.save();
        context.strokeStyle = Colour.White;
        context.lineWidth = MenuState.BORDER_WIDTH;
        context.fillStyle = Colour.Grey;
        context.beginPath();
        context.roundRect(
            MenuState.MARGIN,
            MenuState.MARGIN,
            CANVAS_WIDTH - MenuState.MARGIN * 2,
            CANVAS_HEIGHT - MenuState.MARGIN * 2,
            MenuState.RADIUS
        );
        context.stroke();
        context.fill();

        context.restore();

        for (let i = 0; i < this.paragraphs.length; i++) {
            const paragraph = this.paragraphs[i];
            const position = this.paragraphPositionList[i];
            this.renderText(position.x, position.y, this.paragraphWidth, MenuState.FONT, paragraph);
        }

        context.save();

        context.font = MenuState.FONT;
        context.fillText('Press P to toggle this menu', CANVAS_WIDTH / 2, CANVAS_HEIGHT - MenuState.MARGIN - MenuState.BORDER_WIDTH - MenuState.PADDING);

        context.restore();
    }

    /**
     * Renders a piece of text.
     * 
     * @param {number} left The horizontal position of text on canvas.
     * @param {number} top The vertical position of text on canvas.
     * @param {number} width The width of text.
     * @param {string} font The text style of text (CanvasRenderingContext2D::font).
     * @param {string} text The text.
     */
    renderText(left, top, width, font, text) {
        const words = text.split(' ');
        context.save();
        context.translate(left, top);
        context.font = font;
        context.textBaseline = 'top';
        context.textAlign = 'left';
        let x = 0; // x position of current word
        let y = 0; // y position of current word

        const spaceWidth = context.measureText(' ').width;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const metrics = context.measureText(word);
            const wordWidth = metrics.width;

            // If should start a new line
            if (x + wordWidth >= width) {
                const wordHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
                x = 0;
                y += wordHeight;
            }

            context.fillText(word, x, y);
            x += wordWidth + spaceWidth;
        }

        context.restore();
    }
}