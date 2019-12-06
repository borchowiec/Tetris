/**
 * This method creates and returns single block.
 * @param posX Position x of single block.
 * @param posY Position y of single block.
 * @param color Color of single block.
 * @returns {{posX: *, posY: *, color: *}}
 */
function getSingleBlock(posX, posY, color) {
    return {
        posX: posX,
        posY: posY,
        color: color
    }
}

/**
 * Returns block that has shape of long straight line. The block consists of single blocks.
 * @returns {{posX: *, posY: *, color: *}[]}
 */
function getStraightBlock() {
    let color = "blue";
    return [
        getSingleBlock(2, 0, color),
        getSingleBlock(2, 1, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(2, 3, color)
    ]
}

/**
 * Returns block that has shape of letter T. The block consists of single blocks.
 * @returns {{posX: *, posY: *, color: *}[]}
 */
function getTBlock() {
    let color = "yellow";
    return [
        getSingleBlock(1, 2, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(3, 2, color),
        getSingleBlock(2, 3, color)
    ]
}

/**
 * Returns block that has shape of reversed letter L. The block consists of single blocks.
 * @returns {{posX: *, posY: *, color: *}[]}
 */
function getReversedLBlock() {
    let color = "purple";
    return [
        getSingleBlock(2, 1, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(2, 3, color),
        getSingleBlock(1, 3, color)
    ]
}

/**
 * Returns block that has shape of letter Z. The block consists of single blocks.
 * @returns {{posX: *, posY: *, color: *}[]}
 */
function getZBlock() {
    let color = "pink";
    return [
        getSingleBlock(1, 2, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(2, 3, color),
        getSingleBlock(3, 3, color)
    ]
}

/**
 * Returns block that has shape of square. The block consists of single blocks.
 * @returns {{posX: *, posY: *, color: *}[]}
 */
function getSquareBlock() {
    let color = "red";
    return [
        getSingleBlock(1, 2, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(1, 3, color),
        getSingleBlock(2, 3, color)
    ]
}


/**
 * Returns block that has shape of reversed Z letter. The block consists of single blocks.
 * @returns {{posX: *, posY: *, color: *}[]}
 */
function getReversedZBlock() {
    let color = "orange";
    return [
        getSingleBlock(1, 3, color),
        getSingleBlock(2, 3, color),
        getSingleBlock(2, 2, color),
        getSingleBlock(3, 2, color)
    ]
}

/**
 * Returns block that has shape of letter L. The block consists of single blocks.
 * @returns {{posX: *, posY: *, color: *}[]}
 */
function getLBlock() {
    let color = "dark-blue";
    return [
        getSingleBlock(1, 1, color),
        getSingleBlock(1, 2, color),
        getSingleBlock(1, 3, color),
        getSingleBlock(2, 3, color)
    ]
}

/**
 * This array contains functions that returns blocks.
 */
let blockGenerators = [
    getStraightBlock,
    getTBlock,
    getReversedLBlock,
    getZBlock,
    getSquareBlock,
    getReversedZBlock,
    getLBlock
];

/**
 * Returns random block.
 * @returns {{posX: *, posY: *, color: *}[]}
 */
function getRandomBlock() {
    return blockGenerators[Math.floor(Math.random() * blockGenerators.length)]();
}


