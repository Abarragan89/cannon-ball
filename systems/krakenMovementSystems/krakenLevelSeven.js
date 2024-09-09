import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";

const krakenLevelSevenSystems = (entities) => {
    if (!entities.gameData.isGameOver) {
        moveObstacleLeftToRight(entities.cannon, 75, 100, 1);
        moveObstacleLeftToRight(entities.cannonStand, 75, 100, 1);
        moveObstacleLeftToRight(entities.TNT, 0, Math.floor(screenWidth / 2) - 20, 0.5);
        moveObstacleLeftToRight(entities.longHindOne, 0, 250, 2)
        moveObstacleLeftToRight(entities.longHindTwo, 0, 250, 2)
    }
    return entities;
}

export default krakenLevelSevenSystems;

