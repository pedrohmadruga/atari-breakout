import * as utils from './utils.js'
import * as constants from './constants.js'
import { state } from './state.js';

export function victoryScreen() {
    utils.stopLoop();
    utils.updateHighscore();

    state.ballIsMoving = false;

    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height);
    constants.ctx.font = "48px DM Mono";
    constants.ctx.fillStyle = "#fff";
    constants.ctx.textAlign = "center";
    constants.ctx.textBaseline = "middle";

    constants.ctx.fillText("🎉 You own! 🎉", constants.canvas.width / 2, constants.canvas.height / 2);

    constants.ctx.font = "24px DM Mono";
    constants.ctx.fillText("Click 'Play Again' to restart", constants.canvas.width / 2, constants.canvas.height / 2 + 60);
}

export function loseScreen() {
    utils.stopLoop();
    utils.updateHighscore();

    state.ballIsMoving = false;

    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height);

    constants.ctx.font = "48px DM Mono";
    constants.ctx.fillStyle = "#fff";
    constants.ctx.textAlign = "center";
    constants.ctx.textBaseline = "middle";

    constants.ctx.fillText("💀 Game Over 💀", constants.canvas.width / 2, constants.canvas.height / 2);

    constants.ctx.font = "24px DM Mono";
    constants.ctx.fillText("Click 'Play Again' to restart", constants.canvas.width / 2, constants.canvas.height / 2 + 60);
}