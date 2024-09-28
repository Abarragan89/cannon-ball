import moveObstacleUpAndDown from "../../../utils/moveObstacles/moveObstaclesUpAndDown";

const levelNineHatchSystem = (entities) => {
    if (!entities.gameData.isGameOver) {
        moveObstacleUpAndDown(entities.TNT, 40, 40, 1)
        moveObstacleUpAndDown(entities.hatchSideOne, 20, 60, 1)
        moveObstacleUpAndDown(entities.hatchSideTwo, 20, 60, 1)
        moveObstacleUpAndDown(entities.hatchLid, 5, 75, 1)
    }
    return entities;
}

export default levelNineHatchSystem;