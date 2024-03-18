import colors from "../../constants/colors";

const hitHatchBtn_OpenHatchSystem = (entities) => {
    function openLid() {
        if (entities.hatchLid.position[0] <= entities.hatchBox.position[0] + 57 && entities.cannonBall.isBallMoving) {
            entities.hatchLid.position[0] += 1
        }
    }
    function closeLid() {
        if (entities.hatchLid.position[0] > entities.hatchBox.position[0]) {
            entities.hatchBtn.isHit = false;
            entities.hatchLid.position[0] -= 1
        }
    }
    function turnHatchBtnOn() {
        entities.hatchBtn.color = colors.limeGreen;
        // depending on which type of button it is, Lower the switch
        if (entities.hatchBtn.isTriggerOnTop) {
            entities.hatchBtn.topPosition = -3;
        } else if (entities.hatchBtn.isTriggerOnBottom) {
            entities.hatchBtn.topPosition = 28;
        } else if (entities.hatchBtn.isTriggerOnLeft) {
            entities.hatchBtn.leftPosition = -5
        }
    }

    function turnHatchBtnOff() {
        entities.hatchBtn.color = colors.bronzeStar;
        // depending on which type of button it is, Raise the switch
        if(entities.hatchBtn.isTriggerOnTop) {
            entities.hatchBtn.topPosition = -8;
        } else if (entities.hatchBtn.isTriggerOnBottom) {
            entities.hatchBtn.topPosition = 33;
        } else if (entities.hatchBtn.isTriggerOnLeft) {
            entities.hatchBtn.leftPosition = -11
        }
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

export default hitHatchBtn_OpenHatchSystem;