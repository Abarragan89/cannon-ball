import colors from "../../../constants/colors";
import { Dimensions } from "react-native";
const { width } = Dimensions.get('window');

const hatchLevelOneSystem = (entities) => {
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
        entities.hatchBtn.topPosition = -3;
    }

    function turnHatchBtnOff() {
        entities.hatchBtn.color = colors.bronzeStar;
        entities.hatchBtn.topPosition = -8;
    }
    if (!entities.cannonBall.isGameOver) {
        if (entities.hatchBtn.isHit) {
            turnHatchBtnOn();
            openLid();
        }
        if (!entities.cannonBall.isBallMoving || !entities.hatchBtn.isHit) {
            turnHatchBtnOff();
            closeLid();
        }
    }
    return entities;
}

export default hatchLevelOneSystem;