import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";

const hatchLevelOneSystem = (entities) => {
    if (!entities.cannonBall.isGameOver) {
        if(entities.hatchBtn.isHit) {
            entities.hatchBtn.color = '#08cf08';
            entities.hatchBtn.topPosition = 28;
        }
    }
    return entities;
}

export default hatchLevelOneSystem;