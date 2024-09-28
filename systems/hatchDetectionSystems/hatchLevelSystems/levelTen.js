import { Dimensions } from "react-native";
const { width } = Dimensions.get('window')
import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";
import moveObstacleUpAndDown from "../../../utils/moveObstacles/moveObstaclesUpAndDown";

const levelTenHatchSystem = (entities) => {
    if (!entities.gameData.isGameOver) {
        moveObstacleLeftToRight(entities.hatchBtnOne, Math.floor(width / 5) - 40, Math.floor(width / 2) + 40, 1);
        moveObstacleUpAndDown(entities.hatchBtnTwo, 5, 40, 0.15)
    }
    return entities;
}

export default levelTenHatchSystem;