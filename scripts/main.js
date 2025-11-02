"use strict"

import { Ball, Platform, Brick } from './objects.js'
import { registerEvents } from './event.js'
import * as constants from './constants.js'
import * as utils from './utils.js'

export const platform = new Platform(
    constants.canvas.width / 2 - constants.PLATFORM_STARTER_WIDTH / 2,
    constants.canvas.height - constants.PLATFORM_BOTTOM_MARGIN
);

export const ball = new Ball(
    platform.x + platform.width / 2, 
    platform.y - constants.BALL_STARTER_RADIUS,                  
    constants.BALL_STARTER_SPEED,               
    -constants.BALL_STARTER_SPEED                               
);

registerEvents();

utils.resetGame();
utils.startGame();