const moveTNTMarksLevelSix = (entities) => {
    if (!entities.gameData.isGameOver) {
        const speed = 1;
        // Only allow TNT to move while ball is in the air
        if (entities.cannonBall.isBallMoving && !entities.gameData.isGameOver) {
            // Move Diagonal Left Down
            if (entities.tntMovementCount.tntPixelCounter <= 200) {
                entities.TNT.position[0] += speed;
                entities.TNT.position[1] += speed;
                entities.tntMovementCount.tntPixelCounter++;
                // Move Diagonal Left Up
            } else if (entities.tntMovementCount.tntPixelCounter > 200 && entities.tntMovementCount.tntPixelCounter <= 400) {
                entities.TNT.position[0] += speed;
                entities.TNT.position[1] -= speed;
                entities.tntMovementCount.tntPixelCounter++
                // Move Straight Down
            } else if (entities.tntMovementCount.tntPixelCounter > 400 && entities.tntMovementCount.tntPixelCounter <= 600) {
                entities.TNT.position[1] += speed;
                entities.tntMovementCount.tntPixelCounter++;
                // Move Diagonal Right Up
            } else if (entities.tntMovementCount.tntPixelCounter > 600 && entities.tntMovementCount.tntPixelCounter <= 800) {
                entities.TNT.position[0] -= speed;
                entities.TNT.position[1] -= speed;
                entities.tntMovementCount.tntPixelCounter++;
                // Move Diagonal Right Down
            }
            else if (entities.tntMovementCount.tntPixelCounter > 800 && entities.tntMovementCount.tntPixelCounter <= 1000) {
                entities.TNT.position[0] -= speed;
                entities.TNT.position[1] += speed;
                entities.tntMovementCount.tntPixelCounter++;
            }
            // Move Up
            else if (entities.tntMovementCount.tntPixelCounter > 1000 && entities.tntMovementCount.tntPixelCounter <= 1200) {
                entities.TNT.position[1] -= speed;
                entities.tntMovementCount.tntPixelCounter++;
            }
            else if (entities.tntMovementCount.tntPixelCounter > 1200) {
                entities.tntMovementCount.tntPixelCounter = 0;
            }
        }
    }
    return entities;
}

export default moveTNTMarksLevelSix;