import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')
import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const levelNineHatchSystem = (entities) => {
    if (!entities.gameData.isGameOver) {
        const maxLower = Math.floor(width / 3) + 70
        // moveObstacleLeftToRight(entities.hatchBtn, maxLower, 40, 1)
    }
    return entities;
}

export default levelNineHatchSystem;