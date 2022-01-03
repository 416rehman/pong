export default class Paddle {
    constructor(paddleElem, role) {
        this.paddleElem = paddleElem;
        this.setY(window.innerHeight / 2)
        this.role = role
    }

    getWidth() {
        const offset = this.role == 'player' ? parseFloat(getComputedStyle(this.paddleElem).getPropertyValue('left')) : parseFloat(getComputedStyle(this.paddleElem).getPropertyValue('right'))
        return this.paddleElem.offsetWidth + offset;
    }

    getHeight() {
        return this.paddleElem.offsetHeight;
    }

    getY() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue('--y'));
    }

    setY(y) {
        this.paddleElem.style.setProperty('--y', `${y}px`);
    }
}