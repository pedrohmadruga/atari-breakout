import * as constants from './constants.js'
import * as audio from './audio.js'
import * as screens from './screens.js'
import * as utils from './utils.js'
import { platform, ball } from './main.js';
import { state } from './state.js'

export function gameLoop() {
    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height); 

    platform.draw(constants.ctx); 
    ball.draw(constants.ctx);

    for(const brick of state.bricks) { brick.draw(constants.ctx) }
    let totalBricks = state.bricks.length;

    if (state.ballIsMoving) {
        ball.update();

        // Check collisions
        // Lateral collisions
        if (ball.x - ball.radius <= 0) { // Left
            ball.x = ball.radius; 
            ball.reverseX();
            audio.platformWallCollisionAudio.play();
        } 
        else if (ball.x + ball.radius >= constants.canvas.width) { // Right
            ball.x = constants.canvas.width - ball.radius;
            ball.reverseX();
            audio.platformWallCollisionAudio.play();
        }

        // Top collision
        if (ball.y - ball.radius <= 0) {
            ball.y = ball.radius;
            ball.reverseY();
            audio.platformWallCollisionAudio.play();
        }

        // Platform collision
        const closestX = utils.clamp(ball.x, platform.x, platform.x + platform.width);
        const closestY = utils.clamp(ball.y, platform.y, platform.y + platform.height);

        const deltaX = ball.x - closestX;
        const deltaY = ball.y - closestY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (distance < ball.radius) {
            // Fix overlaping
            const overlap = ball.radius - distance;
            const nx = deltaX / distance; // Unit vectors
            const ny = deltaY / distance;
            ball.x += nx * overlap;
            ball.y += ny * overlap;

            ball.reverseY()
            audio.platformWallCollisionAudio.play();

            // Adjusts xSpeed based on the angle it collided with the platform
            const hitPoint = (ball.x - platform.x) / platform.width - 0.5; 
            ball.xSpeed = hitPoint * 8; 
        }
        
        // Collided with the bottom
        else if (ball.y + ball.radius > constants.canvas.height) {
            audio.playerLoseAudio.play();
            screens.loseScreen();
            return;
        }

        for(const brick of state.bricks) { // Brick collision
            if (!brick.isVisible) continue;

            // Closest point from the center of the ball to the rect of the brick
            const closestX = utils.clamp(ball.x, brick.x, brick.x + brick.width);
            const closestY = utils.clamp(ball.y, brick.y, brick.y + brick.height);

            const deltaX = ball.x - closestX;
            const deltaY = ball.y - closestY;

            if(deltaX * deltaX + deltaY * deltaY <= ball.radius * ball.radius) {
                const overlapX = ball.radius - Math.abs(deltaX);
                const overlapY = ball.radius - Math.abs(deltaY);

                if (overlapX < overlapY) { // Lateral collision
                    if (deltaX > 0) { // Collided with the right side of the brick
                        ball.x += overlapX;
                    }
                    else { // Collided with the left side of the brick
                        ball.x -= overlapX;
                    }
                    ball.reverseX();
                }
                else { // Vertical collision
                    if (deltaY > 0) { // Collided with the bot side of the brick
                        ball.y += overlapY;
                    }
                    else { // Collided with the top side of the brick
                        ball.y -= overlapY;
                    }
                    ball.reverseY();
                }
                brick.isVisible = false;

                (Math.abs(ball.ySpeed) < 8) && (ball.ySpeed > 0 ? (ball.ySpeed += 0.25) : (ball.ySpeed -= 0.25));
                constants.currentScoreEl.textContent = ++state.currentScore;''

                audio.brickCollisionAudio.play();

                if (state.currentScore === totalBricks) {
                    audio.playerWinAudio.play();
                    screens.victoryScreen();
                    return; 
                }

                break;
            }
        }
    }

    state.gameLoopId = requestAnimationFrame(gameLoop);
}