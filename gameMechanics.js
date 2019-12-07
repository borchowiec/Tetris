let points = 0;
let lvl = 1;

let gameLoop;

/**
 * This function initialize key listener.
 */
function initListeners() {
    document.addEventListener('keydown', controlBlock, false);
}

/**
 * This function moves block in specific direction.
 * @param dirX Direction x.
 * @param dirY Direction y.
 * @returns {boolean} True if block collide with something and can't be moved.
 */
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

        let x = copy[i].posX;
        let y = copy[i].posY;
        if ( y >= 0 && boardElements[x][y].occupied) {
            collide = true;
            break;
        }
    }

    if (!collide) currentBlock = copy;

    return collide;
}

/**
 * This function rotates current block.
 */
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

    //other block collision
    let collide = false;
    for (let i = 0; i < copy.length; i++) {
        let x = copy[i].posX;
        let y = copy[i].posY;

        if ( y >= 0 && boardElements[x][y].occupied ) {
            collide = true;
            break;
        }
    }

    //if doesn't collide with other blocks
    if (!collide) currentBlock = copy;

}

/**
 * This function controls current block.
 * @param key Key that was pressed.
 */
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

/**
 * This function handle game over.
 */
function gameOver() {
    clearInterval(gameLoop);
    showGameOverPanel(points);
    currentBlock = [];
}

/**
 * This function resets main loop.
 */
function resetMainLoop() {
    clearInterval(gameLoop);
    gameLoop = setInterval(function () {
        let touchedFloor;
        let removedLines;
        let nextLvl = false;
        touchedFloor = moveCurrentBlock(0, 1);

        if (touchedFloor) {
            for (let i = 0; i < currentBlock.length; i++) {
                if (putBlockToBoard(currentBlock[i])) {
                    gameOver();
                }
            }

            removedLines = removeLines();
            points += removedLines * removedLines * lvl;
            setInfo(points, lvl);

            setCurrentBlock();
            nextBlock = getRandomBlock();
            refreshNextBlockDisplay();

            //check if lvl can be increased
            switch (lvl) {
                case 1:
                    if (points > 50) {
                        lvl = 2;
                        nextLvl = true;
                    }
                    break;
                case 2:
                    if (points > 150) {
                        lvl = 3;
                        nextLvl = true;
                    }
                    break;
                case 3:
                    if (points > 300) {
                        lvl = 4;
                        nextLvl = true;
                    }
                    break;
                case 4:
                    if (points > 500) {
                        lvl = 5;
                        nextLvl = true;
                    }
                    break;
                case 5:
                    if (points > 750) {
                        lvl = 6;
                        nextLvl = true;
                    }
                    break;
                case 6:
                    if (points > 1050) {
                        lvl = 7;
                        nextLvl = true;
                    }
                    break;
                case 7:
                    if (points > 1500) {
                        lvl = 8;
                        nextLvl = true;
                    }
                    break;
                case 8:
                    if (points > 1900) {
                        lvl = 9;
                        nextLvl = true;
                    }
                    break;
                case 9:
                    if (points > 2350) {
                        lvl = 10;
                        nextLvl = true;
                    }
                    break;
            }
        }

        refreshBoard();

        if (nextLvl) {
            setInfo(points, lvl);
            resetMainLoop();
        }

    }, 1100 - (100 * lvl));
}