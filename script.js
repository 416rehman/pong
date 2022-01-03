import Ball from './ball.js';
import Paddle from './paddle.js';

const ball = new Ball(document.querySelector('.ball'))
const player = new Paddle(document.querySelector('.player'), 'player')
const opponent = new Paddle(document.querySelector('.opponent'), 'opponent')
let score = 0;
let paused = true

let lastFrameDrawTime = 0

document.body.addEventListener('player-score', () => {
    score += 1;
    //toggle the animated class on the ball
    document.querySelector('.score').innerHTML = score;
    //change the background color to a random color
    document.body.style.backgroundColor = `rgb(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)})`;
})

document.addEventListener('mousedown', () => {
    if (paused) {
        window.requestAnimationFrame(start);
    } else {
        paused = true;
    }
})

document.addEventListener("mousemove", e => {
    if (paused) return;
    if (e.y < player.getHeight() / 2) return
    if (e.y > window.innerHeight - player.getHeight() / 2) return
    player.setY((e.y / window.innerHeight) * (window.innerHeight))
})

function start(time) {
    paused = false;
    document.querySelector('.score').innerHTML = `${score}`
    lastFrameDrawTime = time
    window.requestAnimationFrame(update)
}

function update(timeSinceStart) {
    if (paused) {
        document.querySelector('.score').innerHTML = 'Paused!<br/> Score: ' + score + '<br/> <small>Click to resume!</small>'
        return;
    }
    const delta = timeSinceStart - lastFrameDrawTime
    lastFrameDrawTime = timeSinceStart

    ball.update(delta)

    opponent.setY(ball.getY())
    ball.handlePaddleCollision(player)
    ball.handlePaddleCollision(opponent)
    ball.handleWallCollision()

    if (ball.getX() <= 0 || ball.getX() > window.innerWidth) {
        ball.reset()
        paused = true
        document.querySelector('.score').innerHTML = 'Game Over!<br/> Score: ' + score + '<br/> <small>Click to play again!</small>'
        score = 0
        return console.log('GAME OVER')
    }

    window.requestAnimationFrame(update)
}