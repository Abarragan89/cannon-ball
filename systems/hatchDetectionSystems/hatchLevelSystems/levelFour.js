import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const levelFourHatchSystem = (entities) => {
    const TNTxPos = entities.TNT.position[0]
    const HindXPos = entities.giantTallOne.position[0]
    if (!entities.gameData.isGameOver) {
        moveObstacleLeftToRight(entities.squareHindOne, HindXPos + 70, screenWidth - TNTxPos + 55, .8)
        moveObstacleLeftToRight(entities.squareHindTwo, TNTxPos + 45, 50, .5)
    }
    return entities;
}

export default levelFourHatchSystem;