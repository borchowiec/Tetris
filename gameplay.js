let currentBlock;
let nextBlock;

/**
 * This function puts next block to the board. Next block is current block.
 */
function setCurrentBlock() {
    currentBlock = nextBlock;
    let collide = moveCurrentBlock(3, -3);
    if (collide) gameOver();
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

    resetMainLoop();
};