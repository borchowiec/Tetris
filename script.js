const WIDTH = 10;
const HEIGHT = 20;

let boardElements;
let nextBlockDisplayElements;

let currentBlock;

function initBoard() {
    let board = document.querySelector(".board");

    boardElements = new Array(HEIGHT);
    for (let i = 0; i < HEIGHT; i++) {
            boardElements[i] = new Array(WIDTH);
    }

    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            let node = document.createElement("div");
            node.setAttribute("class", "block black");
            board.append(node);
            boardElements[j][i] = node;
        }
    }

}

function initNextBlockPanel() {
    let panel = document.querySelector(".next-block-panel");

    nextBlockDisplayElements = new Array(4);
    for (let i = 0; i < 4; i++) {
        nextBlockDisplayElements[i] = new Array(4);
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let node = document.createElement("div");
            node.setAttribute("class", "block black");
            panel.append(node);
            nextBlockDisplayElements[j][i] = node;
        }
    }
}

function initListeners() {
    document.addEventListener('keydown', controlBlock, false);
}

function refreshBoard() {
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            boardElements[j][i].setAttribute("class", "block black");
        }
    }

    for (let i = 0; i < currentBlock.length; i++) {
        let x = currentBlock[i].posX;
        let y = currentBlock[i].posY;
        let color = currentBlock[i].color;

        if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
            boardElements[x][y].setAttribute("class", "block " + color);
        }
    }
}

function moveCurrentBlock(dirX, dirY) {
    let collide = false;
    let copy = JSON.parse(JSON.stringify(currentBlock));
    for (let i = 0; i < copy.length; i++) {
        copy[i].posX += dirX;
        if (copy[i].posX < 0 || copy[i].posX >= WIDTH) {
            collide = true;
            break;
        }
        copy[i].posY += dirY;
        if (copy[i].posY >= HEIGHT) {
            collide = true;
            break;
        }
    }

    if (!collide) currentBlock = copy;

    return collide;
}

function rotateBlock() {
    //counting center block
    let maxX = currentBlock.reduce((max, p) => p.posX > max ? p.posX : max, currentBlock[0].posX);
    let minX = currentBlock.reduce((min, p) => p.posX < min ? p.posX : min, currentBlock[0].posX);
    let maxY = currentBlock.reduce((max, p) =>p.posY > max ? p.posY : max, currentBlock[0].posY);
    let minY = currentBlock.reduce((min, p) =>p.posY < min ? p.posY : min, currentBlock[0].posY);

    const centerX = Math.round((maxX + minX) / 2);
    const centerY = Math.round((maxY + minY) / 2);

    //rotating
    let copy = JSON.parse(JSON.stringify(currentBlock));
    for (let i = 0; i < copy.length; i++) {
        let tX = copy[i].posX;
        let tY = copy[i].posY;

        copy[i].posX = centerX + tY - centerY;
        copy[i].posY = centerY + centerX - tX;
    }

    //move up if its to low
    let difference = copy.reduce((max, p) =>p.posY > max ? p.posY : max, copy[0].posY) - maxY;
    if (difference !== 0) {
        for (let i = 0; i < copy.length; i++) copy[i].posY -= difference;
    }

    //wall collision
    maxX = copy.reduce((max, p) => p.posX > max ? p.posX : max, copy[0].posX);
    minX = copy.reduce((min, p) => p.posX < min ? p.posX : min, copy[0].posX);
    if (maxX >= WIDTH) {
        for (let i = 0; i < copy.length; i++) copy[i].posX -= maxX - WIDTH + 1;
    }
    else if (minX < 0) {
        for (let i = 0; i < copy.length; i++) copy[i].posX -= minX;
    }

    currentBlock = copy;

}

function controlBlock(key) {
    if (key.code === "ArrowLeft") {
        moveCurrentBlock(-1, 0);
        refreshBoard();
    }
    else if (key.code === "ArrowRight") {
        moveCurrentBlock(1, 0);
        refreshBoard();
    }
    else if (key.code === "ArrowDown") {
        moveCurrentBlock(0, 1);
        refreshBoard();
    }
    else if (key.code === "ArrowUp") {
        rotateBlock();
        refreshBoard();
    }
}

window.onload = function() {
    initBoard();
    initNextBlockPanel();
    initListeners();

    currentBlock = getRandomBlock();
    refreshBoard();

        setInterval(function ()
        {
            moveCurrentBlock(0, 1);
            refreshBoard();
        }, 1000);
};