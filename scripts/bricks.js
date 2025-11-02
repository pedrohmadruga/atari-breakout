import * as constants from './constants.js'
import { Brick } from './objects.js'

export function generateBricks() {
    const bricks = [];
    const colors = ["red", "orange", "yellow", "green", "aqua", "blue", "blueviolet", "magenta"];

    for (let row = 0; row < colors.length; row++) {
        let x = constants.BRICK_X_MARGIN;
        const y = constants.BRICK_Y_MARGIN + row * (constants.BRICK_HEIGHT + constants.BRICK_SPACING);

        while (x < constants.canvas.width - constants.BRICK_X_MARGIN) {
            const remainingSpace = constants.canvas.width - constants.BRICK_X_MARGIN - x;
            let width;

            if (remainingSpace <= constants.BRICK_MAX_WIDTH) {
                // The last brick will fit inside the remaining space
                width = remainingSpace;
            } else {
                width = Math.floor(Math.random() * (constants.BRICK_MAX_WIDTH - constants.BRICK_MIN_WIDTH + 1)) + constants.BRICK_MIN_WIDTH;
            }

            bricks.push(new Brick(x, y, width, colors[row]));

            x += width + constants.BRICK_SPACING;

            // If there is no space left for a last brick, we stretch the current one until it reaches the margin
            if (constants.canvas.width - constants.BRICK_X_MARGIN - x < constants.BRICK_MIN_WIDTH) {
                const lastBrick = bricks[bricks.length - 1];
                lastBrick.width += constants.canvas.width - constants.BRICK_X_MARGIN - (x - constants.BRICK_SPACING);
                break;
            }
        }
    }

    return bricks;
}