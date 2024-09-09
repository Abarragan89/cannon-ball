import moveObstacleUpAndDown from "../../utils/moveObstacles/moveObstaclesUpAndDown";
import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

const krakenLevelTenSystems = (entities) => {
    if (!entities.gameData.isGameOver) {
        moveObstacleLeftToRight(entities.cannon, 273, 257, 1.2);
        moveObstacleLeftToRight(entities.cannonStand, 270, 260, 1.2);
        moveObstacleLeftToRight(entities.TNT, 290, 240, 1.2);
        // moveObstacleUpAndDown(entities.TNT, 50, 80, .5);
        // moveObstacleUpAndDown(entities.sideBlockOne, 0, 150, 1.5)
        // moveObstacleUpAndDown(entities.sideBlockTwo, 0, 150, 1.5)


        // if (!entities.gameData.isGameOver) {
        //     // Move Diagonal Right Down
        //     if (entities.cannonMovementCount.cannonLauncher <= 150) {
        //         entities.cannon.position[0] -= speed;
        //         entities.cannon.position[1] += speed;
        //         entities.cannonStand.position[0] -= speed;
        //         entities.cannonStand.position[1] += speed;
        //         entities.cannonMovementCount.cannonLauncher++;
        //         // Move To Right
        //     } else if (entities.cannonMovementCount.cannonLauncher > 150 && entities.cannonMovementCount.cannonLauncher <= 450) {
        //         entities.cannon.position[0] += speed;
        //         entities.cannonStand.position[0] += speed;
        //         entities.cannonMovementCount.cannonLauncher++
        //         // Move Diagonal Up Left
        //     } else if (entities.cannonMovementCount.cannonLauncher > 450 && entities.cannonMovementCount.cannonLauncher <= 600) {
        //         entities.cannon.position[1] -= speed;
        //         entities.cannon.position[0] -= speed;
        //         entities.cannonStand.position[1] -= speed;
        //         entities.cannonStand.position[0] -= speed;
        //         entities.cannonMovementCount.cannonLauncher++;
        //         // Move Diagonal Right Up
        //     } else if (entities.cannonMovementCount.cannonLauncher > 600) {
        //         entities.cannonMovementCount.cannonLauncher = 0;
        //     }
        // }
    }
    return entities;
}

export default krakenLevelTenSystems;
