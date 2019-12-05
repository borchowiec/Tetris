function getSingleBlock(posX, posY, color) {
    return {
        posX: posX,
        posY: posY,
        color: color
    }
}

function getStraightBlock() {
    let color = "blue";
    return [
        getSingleBlock(2, 0, color),
        getSingleBlock(2, 1, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(2, 3, color)
    ]
}

function getTBlock() {
    let color = "yellow";
    return [
        getSingleBlock(1, 2, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(3, 2, color),
        getSingleBlock(2, 3, color)
    ]
}

function getReversedLBlock() {
    let color = "purple";
    return [
        getSingleBlock(2, 1, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(2, 3, color),
        getSingleBlock(1, 3, color)
    ]
}

function getZBlock() {
    let color = "pink";
    return [
        getSingleBlock(1, 2, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(2, 3, color),
        getSingleBlock(3, 3, color)
    ]
}

function getSquareBlock() {
    let color = "red";
    return [
        getSingleBlock(1, 2, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(1, 3, color),
        getSingleBlock(2, 3, color)
    ]
}

function getReversedZBlock() {
    let color = "orange";
    return [
        getSingleBlock(1, 3, color),
        getSingleBlock(2, 3, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(3, 2, color)
    ]
}

function getLBlock() {
    let color = "dark-blue";
    return [
        getSingleBlock(1, 1, color),
        getSingleBlock(1, 2, color),
        getSingleBlock(1, 3, color),
        getSingleBlock(2, 3, color)
    ]
}

let blockGenerators = [
    getStraightBlock,
    getTBlock,
    getReversedLBlock,
    getZBlock,
    getSquareBlock,
    getReversedZBlock,
    getLBlock
];

function getRandomBlock() {
    return blockGenerators[Math.floor(Math.random() * blockGenerators.length)]();
}


