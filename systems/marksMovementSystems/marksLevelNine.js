const marksNineSpeed = 2;
const marksNineTimeDelay = 0.05

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
        // PAUSE
        if (entities.tntMovementCount.tntPixelCounter < 1) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay
        }
        // Move Diagonal Down
        else if (entities.tntMovementCount.tntPixelCounter > 2 && entities.tntMovementCount.tntPixelCounter <= 200) {
            moveDiagonalDownLeft();
        }
        // PAUSE
        else if (entities.tntMovementCount.tntPixelCounter > 200 && entities.tntMovementCount.tntPixelCounter <= 202) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay
        }
        // Move Diagonal Up
        else if (entities.tntMovementCount.tntPixelCounter > 202 && entities.tntMovementCount.tntPixelCounter <= 400) {
            moveDiagonalUpLeft();
        }
        // PAUSE
        else if (entities.tntMovementCount.tntPixelCounter > 400 && entities.tntMovementCount.tntPixelCounter <= 402) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay
        }
        // Move Right
        else if (entities.tntMovementCount.tntPixelCounter > 402 && entities.tntMovementCount.tntPixelCounter <= 600) {
            moveDiagonalDownLeft();
        }
        // PAUSE
        else if (entities.tntMovementCount.tntPixelCounter > 600 && entities.tntMovementCount.tntPixelCounter <= 602) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay
        }
        // Move Down Right Diagonal
        else if (entities.tntMovementCount.tntPixelCounter > 600 && entities.tntMovementCount.tntPixelCounter <= 800) {
            moveDiagonalUpLeft();
        }

        //////////// REVERSE ///////////////
        // PAUSE
        else if (entities.tntMovementCount.tntPixelCounter > 800 && entities.tntMovementCount.tntPixelCounter <= 802) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay
        }
        // Move Diagonal Up
        else if (entities.tntMovementCount.tntPixelCounter > 802 && entities.tntMovementCount.tntPixelCounter <= 1000) {
            moveDiagonalDownRight();
        }
        // PAUSE
        else if (entities.tntMovementCount.tntPixelCounter > 1000 && entities.tntMovementCount.tntPixelCounter <= 1002) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay
        }
        // Move Right
        else if (entities.tntMovementCount.tntPixelCounter > 1002 && entities.tntMovementCount.tntPixelCounter <= 1200) {
            moveDiagonalUpRight();
        }
        // PAUSE
        else if (entities.tntMovementCount.tntPixelCounter > 1200 && entities.tntMovementCount.tntPixelCounter <= 1202) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay
        }
        // Move Down Right Diagonal
        else if (entities.tntMovementCount.tntPixelCounter > 1202 && entities.tntMovementCount.tntPixelCounter <= 1400) {
            moveDiagonalDownRight();
        }
        // PAUSE
        else if (entities.tntMovementCount.tntPixelCounter > 1400 && entities.tntMovementCount.tntPixelCounter <= 1402) {
            entities.tntMovementCount.tntPixelCounter += marksNineTimeDelay
        }
        // Move Up Left Diagonal
        else if (entities.tntMovementCount.tntPixelCounter > 1402 && entities.tntMovementCount.tntPixelCounter <= 1600) {
            moveDiagonalUpRight();
        }
        else if (entities.tntMovementCount.tntPixelCounter > 1600) {
            entities.tntMovementCount.tntPixelCounter = 0;
        }
    }
    return entities;
}

export default moveTNTMarksLevelNine;