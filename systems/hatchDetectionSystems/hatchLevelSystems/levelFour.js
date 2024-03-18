import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const levelFourHatchSystem = (entities) => {
    if (!entities.cannonBall.isGameOver) {
        // MaxRight is calculated based on the position of the Giant Tall Hind
        maxRight = (screenWidth - Math.floor(screenWidth / 4) + 40)
        moveObstacleLeftToRight(entities.squareHindOne, 0, maxRight, 1)
    }
    return entities;
}

export default levelFourHatchSystem;