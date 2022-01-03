export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.direction = {
            x: -1,
            y: 0.47
        };
        this.speed = 0.4;
        this.reset();
        this.difficultMultiplier = 0.02;
    }

    reset() {
        this.setY(window.innerHeight / 2)
        this.setX(window.innerWidth / 2)
    }

    getX() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'));
    }

    getY() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'));
    }

    setY(y) {
        this.ballElem.style.setProperty('--y', `${y}px`);
    }
    setX(x) {
        this.ballElem.style.setProperty('--x', `${x}px`);
    }

    update(delta) {
        this.setX(this.getX() + this.direction.x * this.speed * delta);
        this.setY(this.getY() + this.direction.y * this.speed * delta);
    }

    handlePaddleCollision(paddle) {
        const x = this.getX();
        const y = this.getY();
        let collision_condition = (
            x <= paddle.getWidth() &&
            y <= (paddle.getY() + (paddle.getHeight() / 2)) &&
            y >= (paddle.getY() - (paddle.getHeight() / 2))
        )
        if (paddle.role == 'opponent') {
            collision_condition = (
                x >= window.innerWidth - paddle.getWidth() &&
                y <= (paddle.getY() + (paddle.getHeight() / 2)) &&
                y >= (paddle.getY() - (paddle.getHeight() / 2))
            )
        }

        if (collision_condition) {
            if (paddle.role == 'player') {
                document.body.style.setProperty('filter', 'hue-rotate(' + this.getRandomAngle() + 'deg)');
                document.body.dispatchEvent(new CustomEvent('player-score'));
                this.speed += this.difficultMultiplier;
            }
            this.direction.x *= -1;

            //Animation
            this.ballElem.classList.remove('bounce-anim');
            this.ballElem.offsetWidth   // force reflow
            this.ballElem.classList.add('bounce-anim');

            paddle.paddleElem.classList.remove('attention-anim');
            paddle.paddleElem.offsetWidth   // force reflow
            paddle.paddleElem.classList.add('attention-anim');
        }

        return collision_condition;
    }

    handleWallCollision() {
        const x = this.getX();
        const y = this.getY();

        if (x <= 0 || x >= window.innerWidth) {
            this.direction.x = -this.direction.x;
        }

        if (y <= 0 || y >= window.innerHeight) {
            this.direction.y = -this.direction.y;
        }
    }

    // get random angle between 0 and 360 with step of 50
    getRandomAngle() {
        return Math.floor(Math.random() * 360 / 50) * 50;
    }
}