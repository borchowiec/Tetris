let currentBlock;
let nextBlock;

let points = 0;
let lvl = 1;

/**
 * This function puts next block to the board. Next block is current block.
 */
function setCurrentBlock() {
    currentBlock = nextBlock;
    moveCurrentBlock(3, -3)
}

/**
 * This function starts application.
 */
window.onload = function() {
    //initialization
    initBoard();
    initNextBlockPanel();
    initListeners();
    initInfo();


    //setting up blocks
    nextBlock = getRandomBlock();
    setCurrentBlock();
    nextBlock = getRandomBlock();

    //refreshing boards
    refreshBoard();
    refreshNextBlockDisplay();
    setInfo(points, lvl);

    //main loop
    let touchedFloor;
    let removedLines;
    setInterval(function ()
    {
        touchedFloor = moveCurrentBlock(0, 1);

        if (touchedFloor) {
            for (let i = 0; i < currentBlock.length; i++) {
                if (putBlockToBoard(currentBlock[i])) {
                    console.log("game over"); //todo game over
                }
            }

            removedLines = removeLines();
            points += removedLines * removedLines * lvl;
            setInfo(points, lvl);

            setCurrentBlock();
            nextBlock = getRandomBlock();
            refreshNextBlockDisplay();
        }

        refreshBoard();

    }, 1000);
};