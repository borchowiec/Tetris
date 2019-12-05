
const WIDTH = 10;
const HEIGHT = 20;

function initBoard() {
    let board = document.querySelector(".board");

    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            let node = document.createElement("div");
            node.setAttribute("class", "block x" + j + " y" + i);
            board.append(node);
        }
    }

}

function initNextBlockPanel() {
    let panel = document.querySelector(".next-block-panel");

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let node = document.createElement("div");
            node.setAttribute("class", "block x" + j + " y" + i);
            panel.append(node);
        }
    }
}

window.onload = function() {
    initBoard();
    initNextBlockPanel();
};

