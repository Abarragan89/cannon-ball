// make longHind Move 240 pixels
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";

const krakenLevelFiveSystems = (entities) => {
    if (!entities.gameData.isGameOver) {
        moveObstacleLeftToRight(entities.squareHindOne, Math.floor(screenWidth / 2) + 30, 200, 1);
        moveObstacleLeftToRight(entities.longHindOne, 0, Math.floor(screenWidth / 2) + 80, 2.5);
        moveObstacleLeftToRight(entities.TNT, 0, Math.floor(screenWidth / 2) - 20, 0.5);
    }
    return entities;
}

export default krakenLevelFiveSystems;