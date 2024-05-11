const moveTNTMarksLevelFive = (entities) => {
    if (!entities.gameData.isGameOver){
        const speed = 1;

        // moving right
        if (entities.tntMovementCount.tntPixelCounter <= 300) {
            entities.TNT.position[0] += speed;
            entities.tntMovementCount.tntPixelCounter++;
        // moving down
        } else if (entities.tntMovementCount.tntPixelCounter > 300 && entities.tntMovementCount.tntPixelCounter <=450) {
            entities.TNT.position[1] += speed;
            entities.tntMovementCount.tntPixelCounter++
        // moving left
        } else if (entities.tntMovementCount.tntPixelCounter > 450 && entities.tntMovementCount.tntPixelCounter <= 750) {
            entities.TNT.position[0] -= speed;
            entities.tntMovementCount.tntPixelCounter++;
        // moving up
        } else if (entities.tntMovementCount.tntPixelCounter > 750 && entities.tntMovementCount.tntPixelCounter <=900) {
            entities.TNT.position[1] -= speed;
            entities.tntMovementCount.tntPixelCounter++;
        } else if (entities.tntMovementCount.tntPixelCounter > 900) {
            entities.tntMovementCount.tntPixelCounter = 0;
        }
    }
    return entities;
}

export default moveTNTMarksLevelFive;