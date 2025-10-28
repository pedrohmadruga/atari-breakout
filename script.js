"use strict"

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const PLATFORM_STARTER_WIDTH = 75
const BALL_STARTER_SPEED = 3
const BALL_STARTER_RADIUS = 8


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
    #height = 10;
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
    #height = 20;
    #width;
    #isVisible = true;

    constructor(xPos, yPos, width) {
        this.#xPosition = xPos;
        this.#yPosition = yPos;
        this.#width = width;
    }

    get height() { return this.#height }
    get width() { return this.#width }
    get x() { return this.#xPosition }
    get y() { return this.#yPosition }
    get isVisible() { return this.#isVisible }

    set width(width) { this.#width = width }
    set x(x) { this.#xPosition = x }
    set y(y) { this.#yPosition = y }
    set isVisible(isVisible) { this.#isVisible = isVisible }

    draw = function(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.#xPosition, this.#yPosition, this.#width, this.#height);
    }
}

const platform = new Platform(
    canvas.width / 2 - PLATFORM_STARTER_WIDTH / 2,
    canvas.height - 20
);

const ball = new Ball(
    platform.x + platform.width / 2, 
    platform.y - BALL_STARTER_RADIUS,                  
    BALL_STARTER_SPEED,                               
    -BALL_STARTER_SPEED                               
);

let ballIsMoving = false;

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

    console.log(ball.xSpeed)


    if (ballIsMoving) {
        ball.update();
        if (ball.x >= canvas.width || ball.x <= 0) { ball.reverseX() } // Hit right or left border
        if (ball.y <= 0) { ball.reverseY() } // Hit top border
        if (ball.y >= platform.y && ball.x >= platform.x && ball.x <= platform.x + platform.width) { // Hit the platform
            if (ball.x >= platform.x && ball.x < platform.x + platform.width / 2) { // Hit left side of the platform
                ball.xSpeed = Math.abs(ball.xSpeed) * -1;
            }
            else if (ball.x <= platform.x + platform.width && ball.x > platform.x - platform.width / 2) { // Hit right part of the platform
                ball.xSpeed = Math.abs(ball.xSpeed);
            }
            ball.reverseY();
        }
        else if (ball.y >= canvas.height) {
            console.log('perdeu');
            ballIsMoving = false;
            return;
        }
    }

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    ball.update(canvas.width / 2, platform.y - ball.radius);
    ball.xSpeed = BALL_STARTER_SPEED;
    ball.ySpeed = -BALL_STARTER_SPEED;
}

gameLoop();