import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";

const moveTNTMarksLevelTwo = (entities) => {
    if (!entities.gameData.isGameOver) {
        moveObstacleLeftToRight(entities.TNT, 0, 130, 1)
    }

    return entities;
}

export default moveTNTMarksLevelTwo;