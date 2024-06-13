const moveTNTMarksLevelSeven = (entities) => {
    if (!entities.gameData.isGameOver) {
        const speed = 1;
        // Only allow TNT to move while ball is in the air
        if (entities.cannonBall.isBallMoving && !entities.gameData.isGameOver) {
            // Move Diagonal Right Down
            if (entities.tntMovementCount.tntPixelCounter <= 200) {
                entities.TNT.position[0] -= speed;
                entities.TNT.position[1] += speed;
                entities.tntMovementCount.tntPixelCounter++;
                // Move To Right
            } else if (entities.tntMovementCount.tntPixelCounter > 200 && entities.tntMovementCount.tntPixelCounter <= 400) {
                entities.TNT.position[0] += speed;
                entities.tntMovementCount.tntPixelCounter++
                // Move Diagonal Up Left
            } else if (entities.tntMovementCount.tntPixelCounter > 400 && entities.tntMovementCount.tntPixelCounter <= 600) {
                entities.TNT.position[1] -= speed;
                entities.TNT.position[0] -= speed;
                entities.tntMovementCount.tntPixelCounter++;
                // Move Diagonal Right Up
            } else if (entities.tntMovementCount.tntPixelCounter > 600) {
                entities.tntMovementCount.tntPixelCounter = 0;
            }
        }
    }
    return entities;
}

export default moveTNTMarksLevelSeven;