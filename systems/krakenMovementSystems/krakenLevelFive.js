// make longHind Move 240 pixels
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";

const krakenLevelFiveSystems = (entities) => {
    if (!entities.cannonBall.isGameOver) {
        moveObstacleLeftToRight(entities.squareHindOne, Math.floor(screenWidth / 2) - 70, 200, 1);
        moveObstacleLeftToRight(entities.longHindOne, 0, Math.floor(screenWidth / 2) + 190, 2.5);
        moveObstacleLeftToRight(entities.TNT, 0, Math.floor(screenWidth / 2) - 20, 0.5);
    }
    return entities;
}

export default krakenLevelFiveSystems;