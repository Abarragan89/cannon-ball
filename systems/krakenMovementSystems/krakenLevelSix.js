// make longHind Move 240 pixels
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";

const krakenLevelSixSystems = (entities) => {
    if (!entities.gameData.isGameOver) {
        moveObstacleLeftToRight(entities.cannon, Math.floor(screenWidth / 2) + 100, 100, 1);
        moveObstacleLeftToRight(entities.cannonStand, Math.floor(screenWidth / 2) + 100, 100, 1);
        moveObstacleLeftToRight(entities.TNT, 0, Math.floor(screenWidth / 2) - 20, 0.5);
    }
    return entities;
}

export default krakenLevelSixSystems;

