const marksNineSpeed = 2.5;
const marksNineTimeDelay = 0.01

const moveTNTMarksLevelNine = (entities) => {

    const moveDiagonalDownLeft = () => {
        entities.TNT.position[0] -= marksNineSpeed;
        entities.TNT.position[1] += marksNineSpeed;
        entities.tntMovementCount.tntPixelCounter += marksNineSpeed;
    }
    const moveDiagonalUpLeft = () => {
        entities.TNT.position[0] -= marksNineSpeed;
        entities.TNT.position[1] -= marksNineSpeed;
        entities.tntMovementCount.tntPixelCounter += marksNineSpeed;
    }
    const moveDiagonalDownRight = () => {
        entities.TNT.position[0] += marksNineSpeed;
        entities.TNT.position[1] += marksNineSpeed;
        entities.tntMovementCount.tntPixelCounter += marksNineSpeed;
    }
    const moveDiagonalUpRight = () => {
        entities.TNT.position[0] += marksNineSpeed;
        entities.TNT.position[1] -= marksNineSpeed
        entities.tntMovementCount.tntPixelCounter += marksNineSpeed;
    }

    if (!entities.gameData.isGameOver) {
        const { tntPixelCounter } = entities.tntMovementCount;

        // PAUSE
        if (tntPixelCounter < 2) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay;
        }
        // Move Diagonal Down
        else if (tntPixelCounter > 2 && tntPixelCounter <= 200) {
            moveDiagonalDownLeft();
        }
        // PAUSE
        else if (tntPixelCounter > 200 && tntPixelCounter <= 204) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay;
        }
        // Move Diagonal Up
        else if (tntPixelCounter > 202 && tntPixelCounter <= 400) {
            moveDiagonalUpLeft();
        }
        // PAUSE
        else if (tntPixelCounter > 400 && tntPixelCounter <= 402) {
            console.log('tntPixelCounter in pause ', tntPixelCounter)
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay;
        }
        // Move Diagonal Down Right
        else if (tntPixelCounter > 402 && tntPixelCounter <= 600) {
            moveDiagonalDownLeft();
        }
        // PAUSE
        else if (tntPixelCounter > 600 && tntPixelCounter <= 602) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay;
        }
        // Move Diagonal Up Left
        else if (tntPixelCounter > 602 && tntPixelCounter <= 800) {
            moveDiagonalUpLeft();
        }

        //////////// REVERSE ///////////////
        // PAUSE
        else if (tntPixelCounter > 800 && tntPixelCounter <= 802) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay;
        }
        // Move Diagonal Down Right
        else if (tntPixelCounter > 802 && tntPixelCounter <= 1000) {
            moveDiagonalDownRight();
        }
        // PAUSE
        else if (tntPixelCounter > 1000 && tntPixelCounter <= 1002) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay;
        }
        // Move Diagonal Up Right
        else if (tntPixelCounter > 1002 && tntPixelCounter <= 1200) {
            moveDiagonalUpRight();
        }
        // PAUSE
        else if (tntPixelCounter > 1200 && tntPixelCounter <= 1202) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay;
        }
        // Move Diagonal Down Right
        else if (tntPixelCounter > 1202 && tntPixelCounter <= 1400) {
            moveDiagonalDownRight();
        }
        // PAUSE
        else if (tntPixelCounter > 1400 && tntPixelCounter <= 1402) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay;
        }
        // Move Diagonal Up Right
        else if (tntPixelCounter > 1402 && tntPixelCounter <= 1600) {
            moveDiagonalUpRight();
        }
        // Reset counter after completing a cycle
        else if (tntPixelCounter > 1600) {
            entities.tntMovementCount.tntPixelCounter = 0;
        }
    }
    return entities;
}

export default moveTNTMarksLevelNine;