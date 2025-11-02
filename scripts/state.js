import { Ball, Platform } from "./objects.js";
import * as constants from "./constants.js"

export const platform = new Platform(
        constants.canvas.width / 2 - constants.PLATFORM_STARTER_WIDTH / 2,
        constants.canvas.height - constants.PLATFORM_BOTTOM_MARGIN
    );

export const ball = new Ball(
        platform.x + platform.width / 2, 
        platform.y - constants.BALL_STARTER_RADIUS,                  
        constants.BALL_STARTER_SPEED,               
        -constants.BALL_STARTER_SPEED                               
    )

export const state = {
    ballIsMoving: false,
    gameLoopId: null,
    bricks: [],
    currentScore: 0,
    highscore: 0,
    musicEnabled: true,
};
