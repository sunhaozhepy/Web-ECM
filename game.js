let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let life = canvas.width / 2;
const radius = 5;
let ball_x = radius;
let ball_y = radius;
let dx = 1;
let dy = 1;
let bar_height = 5;
let bar_width = canvas.width / 2;
let bar_x = 0;
let bar_y = canvas.height - bar_height;
let situation = 'start';
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = "12px Arial";
ctx.textAlign = 'center';
ctx.fillStyle = 'green';
ctx.fillText("Welcome to the ball game! Press blankspace to start!", canvas.width / 2, canvas.height / 2);

// key code: 32 for blankspace, 13 for enter, 37 for left, 39 for right
function start(e) {
    if (e.keyCode === 32 && situation === 'start'){
        situation = 'game';
        game();
    }
}

function reset() {
    ball_x = Math.random() * canvas.width;
    ball_y = radius;
    life -= 20;
}

function newgame(e) {
    if (e.keyCode === 13 && situation === 'gameover') {
        ball_x = radius;
        ball_y = radius;
        life = canvas.width / 2;
        dx = parseInt(document.getElementById("ballspeed").value)
        dy = parseInt(document.getElementById("ballspeed").value)
        bar_x = 0;
        bar_width = canvas.width / (parseInt(document.getElementById("barlength").value) + 1)
        situation = 'start';
    }
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

    requestAnimationFrame(game);
    //draws a ball every time the page refreshes, and makes a move of (dx, dy)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ball_x, ball_y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ball_x += dx;
    ball_y += dy;

    //Game life
    ctx.fillStyle = 'red';
    ctx.fillRect((canvas.width - life) / 2, 0, life, 5); //center

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
        ctx.font = "16px Arial";
        ctx.textAlign = 'center'
        ctx.fillStyle = 'green';
        ctx.fillText("YOU LOST! Press enter to retry!", canvas.width / 2, canvas.height / 2);
        situation = 'gameover';
        dx = 0;
        dy = 0;
    }
}

addEventListener('keydown', eventHandler);
addEventListener('keydown', newgame);
addEventListener('keydown', start);