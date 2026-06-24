const start = document.getElementById('start');
const game = document.getElementById('game');
let time = document.getElementById('time');
const result = document.getElementById('result');
const timeH1 = document.getElementById('time-header');
const resultH1 = document.getElementById('result-header');
const inputTime = document.getElementById('game-time');
let score = 0; 

let isGameActive = false;

start.addEventListener('click', startGame);



function startGame() {
    isGameActive = true;
    inputTime.disabled = true;
    score = 0;
    timeH1.classList.remove('hide');
    time.classList.remove('hide');
    resultH1.classList.add('hide');

    start.classList.add('hide');
    game.style.background = 'white';
    renderBox();

    let t = Number(inputTime.value);
    time.innerHTML = t;
    let interval = setInterval(function () {

        let currentTime = Number(time.innerHTML);
        if (currentTime <= 0) {
            clearInterval(interval);
            endGame();


        } else {
            time.innerHTML = (currentTime - 0.1).toFixed(1);
        }
    }, 100)
}

function renderBox() {
    game.innerHTML = '';
    let randomSize = getRandom(30, 100);
    let nDiv = document.createElement('div');
    nDiv.style.width = randomSize + 'px';
    nDiv.style.height = randomSize + 'px';
    let maxDelta = 300 - randomSize;
    nDiv.style.position = 'absolute';
    nDiv.style.top = getRandom(0, maxDelta) + 'px';
    nDiv.style.left = getRandom(0, maxDelta) + 'px';

    let randomColor = getRandomColor();
    nDiv.style.background = randomColor;
    
    nDiv.style.cursor = 'pointer';
    game.append(nDiv);
    nDiv.classList.add('box');

}

function getRandomColor() {
    let r = getRandom(0, 256);
    let g = getRandom(0, 256);
    let b = getRandom(0, 256);
    return `rgb(${r}, ${g}, ${b})`;
}

game.addEventListener('click', gameBoxClick);

function gameBoxClick(event) {
    if (!isGameActive) {
        return;
    }
    if (event.target.classList.contains('box')) {
        score++;
        renderBox();
    }
}

function getRandom(min, max) {
    return (Math.floor(Math.random() * (max - min) + min))
}

function endGame() {
    isGameActive = false;
    game.innerHTML = '';
    start.classList.remove('hide');
    game.style.background = '#ccc';
    time.innerHTML = Number(inputTime.value);
    timeH1.classList.add('hide');
    resultH1.classList.remove('hide');
    result.innerHTML = score;
    inputTime.disabled = false;
}