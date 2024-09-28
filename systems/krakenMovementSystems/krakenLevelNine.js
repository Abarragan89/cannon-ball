import moveObstacleUpAndDown from "../../utils/moveObstacles/moveObstaclesUpAndDown";

const krakenLevelNineSystems = (entities) => {
    if (!entities.gameData.isGameOver) {
        moveObstacleUpAndDown(entities.cannon, 0, 105, 1.2);
        moveObstacleUpAndDown(entities.cannonStand, 75, 30, 1.2);
        moveObstacleUpAndDown(entities.TNT, 50, 80, .5);
    }
    return entities;
}

export default krakenLevelNineSystems;
