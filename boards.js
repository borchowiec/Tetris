/**
 * Width of board.
 * @type {number}
 */
const WIDTH = 10;

/**
 * Height of board.
 * @type {number}
 */
const HEIGHT = 20;

/**
 * This array contains board elements.
 */
let boardElements;

/**
 * This array contains elements that displays next block.
 */
let nextBlockDisplayElements;

/**
 * This element displays points.
 */
let pointsSpan;

/**
 * This element display current level.
 */
let lvlSpan;

/**
 * Panel that shows final results.
 */
let gameOverPanel;

/**
 * Span that contains final amount of points.
 */
let earnedPoints;

/**
 * This method initialize main board.
 */
function initBoard() {
    let board = document.querySelector(".board");

    //create array
    boardElements = new Array(HEIGHT);
    for (let i = 0; i < HEIGHT; i++) {
        boardElements[i] = new Array(WIDTH);
    }

    //put elements to html and fill array
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            let node = document.createElement("div");
            node.setAttribute("class", "block black");
            board.append(node);
            boardElements[j][i] = {
                node : node,
                color : "black",
                occupied : false
            };
        }
    }
}

/**
 * Initialize panel that displays next block.
 */
function initNextBlockPanel() {
    let panel = document.querySelector(".next-block-panel");

    //creates array
    nextBlockDisplayElements = new Array(4);
    for (let i = 0; i < 4; i++) {
        nextBlockDisplayElements[i] = new Array(4);
    }

    //puts elements to html and fill array
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let node = document.createElement("div");
            node.setAttribute("class", "block black");
            panel.append(node);
            nextBlockDisplayElements[j][i] = node;
        }
    }
}

/**
 * Initialize elements that displays information about game.
 */
function initInfo() {
    pointsSpan = document.getElementById("points");
    lvlSpan = document.getElementById("lvl");
    gameOverPanel = document.querySelector(".game-over-panel");
    earnedPoints = document.getElementById("earned-points");

}

/**
 * Refreshes board. "Repaints" main board.
 */
function refreshBoard() {
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            let color = boardElements[j][i].color;
            boardElements[j][i].node.setAttribute("class", "block " + color);
        }
    }

    for (let i = 0; i < currentBlock.length; i++) {
        let x = currentBlock[i].posX;
        let y = currentBlock[i].posY;
        let color = currentBlock[i].color;

        if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
            boardElements[x][y].node.setAttribute("class", "block " + color);
        }
    }
}

/**
 * Refreshes panel that displays next block. "Repaints" this panel.
 */
function refreshNextBlockDisplay() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            nextBlockDisplayElements[i][j].setAttribute("class", "block black");
        }
    }

    for (let i = 0; i < nextBlock.length; i++) {
        let x = nextBlock[i].posX;
        let y = nextBlock[i].posY;
        let color = nextBlock[i].color;
        nextBlockDisplayElements[x][y].setAttribute("class", "block " + color);
    }
}

/**
 * This function puts displays information about game.
 * @param points Amount of points.
 * @param lvl Level
 */
function setInfo(points, lvl) {
    pointsSpan.textContent = points;
    lvlSpan.textContent = lvl;
}

/**
 * This method puts block to the board. After this, this single block will be colliding with controllable blocks.
 * @param singleBlock Single block that will be put to board.
 * @returns {boolean} True, if block is higher than board. You can detect when player lost.
 */
function putBlockToBoard(singleBlock) {
    let x = singleBlock.posX;
    let y = singleBlock.posY;
    let color = singleBlock.color;

    if (y < 0) {
        return true;
    }

    boardElements[x][y].node.setAttribute("class", "block " + color);
    boardElements[x][y].color = color;
    boardElements[x][y].occupied = true;

    return false;
}

/**
 * This function checks if there is some lines that can be removed. Returns amount of removed lines.
 * @returns {number} Amount of removed lines.
 */
function removeLines() {

    let removedLines = 0;

    for (let y = 0; y < HEIGHT; y++) {
        let temp = 0;
        for (let x = 0; x < WIDTH; x++) {
            if (boardElements[x][y].occupied) temp++;
            else break;
        }

        if (temp === WIDTH) {
            removedLines++;
            for (let aX = 0; aX < WIDTH; aX++) {
                for (let aY = y; aY >= 1; aY--) {
                    boardElements[aX][aY].color = boardElements[aX][aY - 1].color;
                    boardElements[aX][aY].occupied = boardElements[aX][aY - 1].occupied;
                }
            }

            for (let aX = 0; aX < WIDTH; aX++) {
                    boardElements[aX][0].color = "black";
                    boardElements[aX][0].occupied = false;
            }
        }
    }

    return removedLines;
}

/**
 * This function displays final panel with results.
 */
function showGameOverPanel(points) {
    earnedPoints.textContent = points;
    gameOverPanel.style.display = "block";
}