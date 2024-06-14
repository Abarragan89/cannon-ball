const moveTNTMarksLevelNine = (entities) => {
    if (!entities.gameData.isGameOver) {
        const speed = 2;
        // Move Diagonal Down
        if (entities.tntMovementCount.tntPixelCounter <= 150) {
            entities.TNT.position[0] -= speed;
            entities.TNT.position[1] += speed 
            entities.tntMovementCount.tntPixelCounter += speed;
            // Move Left
        } else if (entities.tntMovementCount.tntPixelCounter > 150 && entities.tntMovementCount.tntPixelCounter <= 300) {
            entities.TNT.position[0] -= speed;
            entities.tntMovementCount.tntPixelCounter += speed
            // moving left
        } else if (entities.tntMovementCount.tntPixelCounter > 450 && entities.tntMovementCount.tntPixelCounter <= 750) {
            entities.TNT.position[0] -= speed;
            entities.tntMovementCount.tntPixelCounter++;
            // moving up
        } else if (entities.tntMovementCount.tntPixelCounter > 750 && entities.tntMovementCount.tntPixelCounter <= 900) {
            entities.TNT.position[1] -= speed;
            entities.tntMovementCount.tntPixelCounter++;
        } else if (entities.tntMovementCount.tntPixelCounter > 900) {
            entities.tntMovementCount.tntPixelCounter = 0;
        }
    }
    return entities;
}

export default moveTNTMarksLevelNine;