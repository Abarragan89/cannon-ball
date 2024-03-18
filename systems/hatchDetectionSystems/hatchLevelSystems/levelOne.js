import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const levelOneHatchSystem = (entities) => {
    if (!entities.cannonBall.isGameOver) {
        moveObstacleLeftToRight(entities.squareHindTwo, 340, 170, 1)
    }
    return entities;
}

export default levelOneHatchSystem;