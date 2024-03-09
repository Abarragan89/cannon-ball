import colors from "../../../constants/colors";
import { Dimensions } from "react-native";
const { width } = Dimensions.get('window');
import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const hatchLevelTwoSystem = (entities) => {
    function openLid() {
        if (entities.hatchLid.position[0] <= width - 57 && entities.cannonBall.isBallMoving) {
            entities.hatchLid.position[0] += 1
        }
    }
    function closeLid() {
        if (entities.hatchLid.position[0] >= width - 113) {
            entities.hatchBtn.isHit = false;
            entities.hatchLid.position[0] -= 1
        }
    }
    function turnHatchBtnOn() {
        entities.hatchBtn.color = colors.limeGreen;
        entities.hatchBtn.topPosition = 28;
    }

    function turnHatchBtnOff() {
        entities.hatchBtn.color = colors.bronzeStar;
        entities.hatchBtn.topPosition = 33;
    }
    if (!entities.cannonBall.isGameOver) {
        if (entities.hatchBtn.isHit) {
            turnHatchBtnOn();
            openLid();
        }
        if (!entities.cannonBall.isBallMoving) {
            turnHatchBtnOff();
            closeLid();
        }
        moveObstacleLeftToRight(entities.squareHindTwo, 340, 170, 1)
    }

    return entities;
}

export default hatchLevelTwoSystem;