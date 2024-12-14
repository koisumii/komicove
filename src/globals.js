import Fonts from '../lib/Fonts.js';
import Images from '../lib/Images.js';
import Sounds from '../lib/Sounds.js';
import StateMachine from '../lib/StateMachine.js';
import Timer from '../lib/Timer.js';
import Input from '../lib/Input.js';
import Debug from '../lib/Debug.js';

export const canvas = document.createElement('canvas');
export const context =
	canvas.getContext('2d') || new CanvasRenderingContext2D();

// Replace these values according to how big you want your canvas.
export const CANVAS_WIDTH = 384;
export const CANVAS_HEIGHT = 216;

const resizeCanvas = () => {

	const aspectRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
	const windowAspectRatio = window.innerWidth / window.innerHeight;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const scaleX = window.innerWidth / CANVAS_WIDTH;
	const scaleY = window.innerHeight / CANVAS_HEIGHT;
	const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

	if(aspectRatio > windowAspectRatio) {
		context.translate(0, (window.innerHeight - window.innerWidth / aspectRatio) / 2)
	}
	else{
		context.translate((window.innerWidth - window.innerHeight * aspectRatio) / 2, 0)
	}

	// canvas.style.width = `${CANVAS_WIDTH * scale}px`;
	// canvas.style.height = `${CANVAS_HEIGHT * scale}px`;

	context.scale(scale,scale)
	context.imageSmoothingEnabled = false // takes as pixels
};

// Listen for canvas resize events
window.addEventListener('resize', resizeCanvas);

resizeCanvas(); // Call once to scale initially

export const keys = {};
export const images = new Images(context);
export const fonts = new Fonts();
export const stateMachine = new StateMachine();
export const timer = new Timer();
export const input = new Input(canvas);
export const sounds = new Sounds();
export const debug = new Debug();

export const DEBUG = false;