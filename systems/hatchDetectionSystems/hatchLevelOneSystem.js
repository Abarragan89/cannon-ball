import colors from "../../constants/colors";

const hatchLevelOneSystem = (entities) => {
    if (!entities.cannonBall.isGameOver) {
        if(entities.hatchBtn.isHit) {
            entities.hatchBtn.color = colors.limeGreen;
            entities.hatchBtn.topPosition = 28;
        }
    }
    return entities;
}

export default hatchLevelOneSystem;