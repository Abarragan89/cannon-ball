import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const levelTwoHatchSystem = (entities) => {
    if (!entities.gameData.isGameOver) {
        //  maxRight is where the hatchbox is located plus '50' pixels for the width of the hatchBtn
        moveObstacleLeftToRight(entities.hatchBtn, 250, 186 + 50, 0.8)
    }
    return entities;
}

export default levelTwoHatchSystem;