import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";

const krakenLevelEightSystems = (entities) => {
    if (!entities.gameData.isGameOver) {
        moveObstacleLeftToRight(entities.cannon, 0, Math.floor(screenWidth / 2) + 70, 1.2);
        moveObstacleLeftToRight(entities.cannonStand, 0, Math.floor(screenWidth / 2) + 70, 1.2);
        moveObstacleLeftToRight(entities.TNT, Math.floor(screenWidth / 2) + 50, Math.floor(screenWidth / 2) - 220, .8);
    }
    return entities;
}

export default krakenLevelEightSystems;
