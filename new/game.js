let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

let life = canvas.width / 2;
const radius = canvas.width / 60;
let ball_x = radius;
let ball_y = radius;
let dx, dy;
let bar_height = canvas.height / 20;
let bar_width;
let bar_x;
let bar_y = canvas.height - bar_height;
let situation = 'start';

let animation;
ctx.fillStyle = 'rgba(0,0,0,.2)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = "50px Arial";
ctx.textAlign = 'center';
ctx.fillStyle = 'green';
ctx.fillText("Welcome to the ball game! Press blankspace to start!", canvas.width / 2, canvas.height / 2);

// key code: 32 for blankspace, 13 for enter, 37 for left, 39 for right
function start(e) {
    if (e.keyCode === 32 && situation === 'start') {
        ball_x = radius;
        ball_y = radius;
        life = canvas.width / 2;
        dx = 3 * parseInt(document.getElementById("ballspeed").value)
        dy = 3 * parseInt(document.getElementById("ballspeed").value)
        bar_x = 0;
        bar_width = canvas.width / (parseInt(document.getElementById("barlength").value) + 1)
        situation = 'game';
        if (animation) {
            window.cancelAnimationFrame(animation);
        }
        game();
    }
}

function reset() {
    ball_x = Math.random() * canvas.width;
    ball_y = radius;
    life -= 40;
}

function eventHandler(e) {
    switch (e.keyCode) {
        case 37:
            bar_x -= 20;
            if (bar_x < 0) {
                bar_x = 0;
            }
            break;
        case 39:
            bar_x += 20;
            if (bar_x + bar_width > canvas.width) {
                bar_x = canvas.width - bar_width;
            }
            break;
    }
}

function game() {

    animation = window.requestAnimationFrame(game);
    //draws a ball every time the page refreshes, and makes a move of (dx, dy)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ball_x, ball_y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    ball_x += dx;
    ball_y += dy;

    //Game life
    ctx.fillStyle = 'red';
    ctx.fillRect((canvas.width - life) / 2, 0, life, canvas.height / 10); //center

    //bar
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bar_x, bar_y, bar_width, bar_height);

    //when he ball touches the left or the right wall
    if (ball_x + radius > canvas.width || ball_x - radius < 0) {
        dx = -dx;
    }

    //when the ball touches the ceiling
    if (ball_y - radius < 0) {
        dy = -dy
    }

    //when the ball touches (or not) the bar
    if (ball_y + radius > canvas.height) {
        if (ball_x > bar_x && ball_x < bar_x + bar_width) {
            dy = -dy;
        } else {
            reset();
        }
    }

    if (life < 0) {
        ctx.font = "50px Arial";
        ctx.textAlign = 'center'
        ctx.fillStyle = 'green';
        ctx.fillText("YOU LOST! Press blankspace to retry!", canvas.width / 2, canvas.height / 2);
        situation = 'start';
        dx = 0;
        dy = 0;
    }
}

addEventListener('keydown', eventHandler);
addEventListener('keydown', start);