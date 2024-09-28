import moveObstacleUpAndDown from "../../utils/moveObstacles/moveObstaclesUpAndDown";
import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

const krakenLevelTenSystems = (entities) => {
    if (!entities.gameData.isGameOver) {
        moveObstacleLeftToRight(entities.cannon, 283, 327, 1.2);
        moveObstacleLeftToRight(entities.cannonStand, 280, 330, 1.2);
        moveObstacleLeftToRight(entities.TNT, 300, 310, 1.2);
        // Moving Left Obstacles
        moveObstacleUpAndDown(entities.leftHinderOne, 0, 150, 1.5);
        moveObstacleUpAndDown(entities.leftHinderTwo, 0, 150, 1.5)
        moveObstacleUpAndDown(entities.leftHinderThree, 0, 150, 1.5)
        // Moving Right Obstacles
        moveObstacleUpAndDown(entities.rightHinderOne, 0, 150, 1.5);
        moveObstacleUpAndDown(entities.rightHinderTwo, 0, 150, 1.5)
        moveObstacleUpAndDown(entities.rightHinderThree, 0, 150, 1.5)
    }
    return entities;
}

export default krakenLevelTenSystems;
