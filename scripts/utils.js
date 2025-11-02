import * as constants from './constants.js'
import * as bricksUtils from './bricks.js'
import { ball, platform, state } from './state.js';
import { gameLoop } from './game.js';

// "Sticks" a value inside an interval
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

export function startGame() {
    state.ballIsMoving = false;
    state.bricks = bricksUtils.generateBricks();
    state.currentScore = 0;
    constants.currentScoreEl.textContent = 0;
    gameLoop();
}

export function stopLoop() {
    cancelAnimationFrame(state.gameLoopId);
}

export function resetGame() {
    ball.xSpeed = constants.BALL_STARTER_SPEED;
    ball.ySpeed = -constants.BALL_STARTER_SPEED;
    ball.x = constants.canvas.width / 2;
    ball.y = platform.y - ball.radius;
    ball.update(ball.x, ball.y);
    state.ballIsMoving = false;
}

export function updateHighscore() {
    if (state.highscore < state.currentScore) {
        state.highscore = state.currentScore;
        constants.highscoreEl.textContent = state.highscore;
    }
}