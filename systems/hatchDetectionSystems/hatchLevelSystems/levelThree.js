import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const levelThreeHatchSystem = (entities) => {
    if (!entities.gameData.isGameOver) {
        moveObstacleLeftToRight(entities.squareHindTwo, 340, 170, 1)
    }
    return entities;
}

export default levelThreeHatchSystem;