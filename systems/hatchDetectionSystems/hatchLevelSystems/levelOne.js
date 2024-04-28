import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const levelOneHatchSystem = (entities) => {
    if (!entities.gameData.isGameOver) {
        //  maxRight is where the hatchbox is located plus '50' pixels for the width of the hatchBtn
        moveObstacleLeftToRight(entities.hatchBtn, 0, 186 + 50, 0.5)
    }
    return entities;
}

export default levelOneHatchSystem;