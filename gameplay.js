let currentBlock;
let nextBlock;

function setCurrentBlock() {
    currentBlock = nextBlock;
    moveCurrentBlock(3, -3)
}

window.onload = function() {
    initBoard();
    initNextBlockPanel();
    initListeners();

    nextBlock = getRandomBlock();
    setCurrentBlock();
    nextBlock = getRandomBlock();

    refreshBoard();
    refreshNextBlockDisplay();

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