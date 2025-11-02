import { PLATFORM_HEIGHT, PLATFORM_STARTER_WIDTH, BALL_STARTER_RADIUS, BRICK_HEIGHT } from './constants.js';

export class Ball {
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

export class Platform {
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

export class Brick {
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