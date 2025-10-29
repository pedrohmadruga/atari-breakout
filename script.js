"use strict"

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const PLATFORM_STARTER_WIDTH = 75;
const BALL_STARTER_SPEED = 3;
const BALL_STARTER_RADIUS = 8;
const BRICK_X_MARGIN = 20; // Margin before the right and left borders of the canvas
const BRICK_Y_MARGIN = 50; // Margin before the top border
const BRICK_SPACING = 8; // Spacing between bricks
const BRICK_HEIGHT = 20;
const PLATFORM_HEIGHT = 10;
const PLATFORM_BOTTOM_MARGIN = 20;
const BRICK_MIN_WIDTH = 60;
const BRICK_MAX_WIDTH = 100;
const ROWS = 8;

let ballIsMoving;

class Ball {
    #xPosition;
    #yPosition;
    #xSpeed;
    #ySpeed;
    #radius = BALL_STARTER_RADIUS;

    constructor(xPos, yPos, xSpe, ySpe) {
        this.#xPosition = xPos;
        this.#yPosition = yPos;
        this.#xSpeed = xSpe;
        this.#ySpeed = ySpe;
    };

    get x() { return this.#xPosition; }
    get y() { return this.#yPosition; }
    get xSpeed() { return this.#xSpeed }
    get ySpeed() { return this.#ySpeed }
    get radius() { return this.#radius; }

    set xSpeed(xSpe) { this.#xSpeed = xSpe };
    set ySpeed(ySpe) { this.#ySpeed = ySpe };
    set x(x) { this.#xPosition = x};
    set y(y) { this.#yPosition = y};


    set radius(radius) { this.#radius = radius }

    update = function() {
        this.#xPosition += this.#xSpeed;
        this.#yPosition += this.#ySpeed;
    }

    reverseX = function() {
        this.#xSpeed *= -1;
    }

    reverseY = function() {
        this.#ySpeed *= -1;
    }

    draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.#xPosition, this.#yPosition, this.#radius, 0, Math.PI * 2); 
        ctx.fillStyle = "white"; 
        ctx.fill(); 
        ctx.closePath();
    }
}

class Platform {
    #height = PLATFORM_HEIGHT;
    #width = PLATFORM_STARTER_WIDTH;
    #xPosition;
    #yPosition;

    constructor(xPos, yPos) {
        this.#xPosition = xPos;
        this.#yPosition = yPos;
    }
    

    get height() { return this.#height }
    get width() { return this.#width }
    get x() { return this.#xPosition }
    get y() { return this.#yPosition }

    set x(x) { this.#xPosition = x }
    set y(y) {this.#yPosition = y }

    set width(width) { this.#width = width }

    draw = function(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.#xPosition, this.#yPosition, this.#width, this.#height);
    }
}

class Brick {
    #xPosition;
    #yPosition;
    #height = BRICK_HEIGHT;
    #width;
    #isVisible = true;
    #color;

    constructor(xPos, yPos, width, color) {
        this.#xPosition = xPos;
        this.#yPosition = yPos;
        this.#width = width;
        this.#color = color
    }

    get height() { return this.#height }
    get width() { return this.#width }
    get x() { return this.#xPosition }
    get y() { return this.#yPosition }
    get isVisible() { return this.#isVisible }
    get color() { return this.#color }

    set width(width) { this.#width = width }
    set x(x) { this.#xPosition = x }
    set y(y) { this.#yPosition = y }
    set isVisible(isVisible) { this.#isVisible = isVisible }

    draw = function(ctx) {
        ctx.fillStyle = this.#color;
        if (this.isVisible) {
            ctx.fillRect(this.#xPosition, this.#yPosition, this.#width, this.#height);
        }
    }
}

const platform = new Platform(
    canvas.width / 2 - PLATFORM_STARTER_WIDTH / 2,
    canvas.height - PLATFORM_BOTTOM_MARGIN
);

const ball = new Ball(
    platform.x + platform.width / 2, 
    platform.y - BALL_STARTER_RADIUS,                  
    BALL_STARTER_SPEED,               
    -BALL_STARTER_SPEED                               
);

const bricks = generateBricks();

function generateBricks() {
    const bricks = [];
    const colors = ["red", "orange", "yellow", "green", "aqua", "blue", "blueviolet", "magenta"]

    for (let row = 0; row < ROWS; row++) {
        let x = BRICK_X_MARGIN;
        const y = BRICK_Y_MARGIN + row * (BRICK_HEIGHT + BRICK_SPACING);

        while (x < canvas.width - BRICK_X_MARGIN) {
            const remainingSpace = canvas.width - BRICK_X_MARGIN - x;
            let width;

            if (remainingSpace <= BRICK_MAX_WIDTH) {
                // The last brick will fit inside the remaining space
                width = remainingSpace;
            } else {
                width = Math.floor(Math.random() * (BRICK_MAX_WIDTH - BRICK_MIN_WIDTH + 1)) + BRICK_MIN_WIDTH;
            }

            bricks.push(new Brick(x, y, width, colors[row]));

            x += width + BRICK_SPACING;

            // If there is no space left for a last brick, we stretch the current one until it reaches the margin
            if (canvas.width - BRICK_X_MARGIN - x < BRICK_MIN_WIDTH) {
                const lastBrick = bricks[bricks.length - 1];
                lastBrick.width += canvas.width - BRICK_X_MARGIN - (x - BRICK_SPACING);
                break;
            }
        }
    }

    return bricks;
}

// "Sticks" a value inside an interval
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

resetGame();

canvas.addEventListener("mousedown", () => {
    if (!ballIsMoving) {
        resetGame();
        ballIsMoving = true;
    }
});

canvas.addEventListener("mousemove", event => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    platform.x = Math.max(0, Math.min(mouseX - platform.width / 2, canvas.width - platform.width));
});


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    platform.draw(ctx); 
    ball.draw(ctx);

    for(const brick of bricks) { brick.draw(ctx) }

    if (ballIsMoving) {
        ball.update();

        // Check collisions
        // Lateral collisions
        if (ball.x - ball.radius <= 0) { // Left
            ball.x = ball.radius; 
            ball.reverseX();
        } 
        else if (ball.x + ball.radius >= canvas.width) { // Right
            ball.x = canvas.width - ball.radius;
            ball.reverseX();
        }

        // Top collision
        if (ball.y - ball.radius <= 0) {
            ball.y = ball.radius;
            ball.reverseY();
        }

        // Platform collision
        const closestX = clamp(ball.x, platform.x, platform.x + platform.width);
        const closestY = clamp(ball.y, platform.y, platform.y + platform.height);

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

            // Adjusts xSpeed based on the angle it collided with the platform
            const hitPoint = (ball.x - platform.x) / platform.width - 0.5; 
            ball.xSpeed = hitPoint * 8; 
        }
        
        else if (ball.y + ball.radius > canvas.height) { 
            console.log('perdeu');
            ballIsMoving = false;
            return;
        }

        for(const brick of bricks) { // Brick collision
            if (!brick.isVisible) continue;

            // Closest point from the center of the ball to the rect of the brick
            const closestX = clamp(ball.x, brick.x, brick.x + brick.width);
            const closestY = clamp(ball.y, brick.y, brick.y + brick.height);

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
                break;
            }
        }
    }

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    ball.update(canvas.width / 2, platform.y - ball.radius);
    ball.xSpeed = BALL_STARTER_SPEED;
    ball.ySpeed = -BALL_STARTER_SPEED;
    ballIsMoving = false;
}

gameLoop();