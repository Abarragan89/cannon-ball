import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";
const krakenLevelFour = (entities) => {
    if (!entities.gameData.isGameOver) {
        // move TNT
        moveObstacleLeftToRight(entities.TNT, 0, 30, 0.8);
        // Move Square One
        moveObstacleLeftToRight(entities.squareHindOne, 0, Math.floor(screenWidth / 2) + 40, 1);
        // Move Square Two
        moveObstacleLeftToRight(entities.squareHindTwo, Math.floor(screenWidth / 2), 40, 1);
        // Move Long Hind One
        moveObstacleLeftToRight(entities.longHindOne, 0, Math.floor(screenWidth/2) + 120, 1);
        // Move Long Hind Two
        moveObstacleLeftToRight(entities.longHindTwo, Math.floor(screenWidth/2), 120, 1);
        // Move Long Hind Three
        moveObstacleLeftToRight(entities.longHindThree, 0, Math.floor(screenWidth/2) + 120, 1);
        // Move Long Hind Four
        moveObstacleLeftToRight(entities.longHindFour, Math.floor(screenWidth/2), 120, 1);
    }

    return entities;
}

export default krakenLevelFour;