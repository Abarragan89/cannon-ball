import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')
import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const levelFiveHatchSystem = (entities) => {
    if (!entities.cannonBall.isGameOver) {
        const maxLower = Math.floor(width / 3) + 70
        moveObstacleLeftToRight(entities.hatchBtn, maxLower, 40, 1)
        // moveObstacleLeftToRight(entities.hatchBtnTwo, maxLower, 40, 1.5)

    }
    return entities;
}

export default levelFiveHatchSystem;