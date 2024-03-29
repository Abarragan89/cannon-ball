const moveTNTMarksLevelFive = (entities) => {
    if (!entities.gameData.isGameOver){
        const speed = 1;

        // moving right
        if (entities.gameData.tntPixelCounter <= 300) {
            entities.TNT.position[0] += speed;
            entities.gameData.tntPixelCounter++;
        // moving down
        } else if (entities.gameData.tntPixelCounter > 300 && entities.gameData.tntPixelCounter <=450) {
            entities.TNT.position[1] += speed;
            entities.gameData.tntPixelCounter++
        // moving left
        } else if (entities.gameData.tntPixelCounter > 450 && entities.gameData.tntPixelCounter <= 750) {
            entities.TNT.position[0] -= speed;
            entities.gameData.tntPixelCounter++;
        // moving up
        } else if (entities.gameData.tntPixelCounter > 750 && entities.gameData.tntPixelCounter <=900) {
            entities.TNT.position[1] -= speed;
            entities.gameData.tntPixelCounter++;
        } else if (entities.gameData.tntPixelCounter > 900) {
            entities.gameData.tntPixelCounter = 0;
        }
    }
    return entities;
}

export default moveTNTMarksLevelFive;