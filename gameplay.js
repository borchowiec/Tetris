let currentBlock;
let nextBlock;

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

    //setting up blocks
    nextBlock = getRandomBlock();
    setCurrentBlock();
    nextBlock = getRandomBlock();

    //refreshing boards
    refreshBoard();
    refreshNextBlockDisplay();

    //main loop
    let touchedFloor;
    setInterval(function ()
    {
        touchedFloor = moveCurrentBlock(0, 1);

        if (touchedFloor) {
            for (let i = 0; i < currentBlock.length; i++) {
                if (putBlockToBoard(currentBlock[i])) {
                    console.log("game over"); //todo game over
                }
            }

            setCurrentBlock();
            nextBlock = getRandomBlock();
            refreshNextBlockDisplay();
        }

        refreshBoard();

    }, 1000);
};