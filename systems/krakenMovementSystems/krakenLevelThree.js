import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";
import moveObstacleUpAndDown from "../../utils/moveObstacles/moveObstaclesUpAndDown";

const krakenLevelThree = (entities) => {
    if (!entities.gameData.isGameOver) {
        // Move square Hinderance
        moveObstacleLeftToRight(entities.squareHindOne, 150, Math.floor(screenWidth / 2) - 100, 1)
        moveObstacleUpAndDown(entities.longHindTwo, 50, 170, 1);
        moveObstacleUpAndDown(entities.TNT, 170, 140, 0.2)
    }
    return entities;
}

export default krakenLevelThree;