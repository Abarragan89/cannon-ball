import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')
import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const levelSevenHatchSystem = (entities) => {
    if (!entities.gameData.isGameOver) {
        const maxLower = Math.floor(width / 3) + 100
        moveObstacleLeftToRight(entities.hatchBtnOne, maxLower, 40, 1)
        // moveObstacleLeftToRight(entities.hatchBtnTwo, 50, maxLower + 150, .3)
    }
    return entities;
}

export default levelSevenHatchSystem;