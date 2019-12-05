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
    for (let i = 0; i < currentBlock.length; i++) {
        currentBlock[i].posX += dirX;
        currentBlock[i].posY += dirY;
    }
}

window.onload = function() {
    initBoard();
    initNextBlockPanel();

    currentBlock = getRandomBlock();

    refreshBoard();

        setInterval(function ()
        {
            moveCurrentBlock(0, 1);
            refreshBoard();
        }, 1000);
};

