import colors from "../../constants/colors";

const doubleHatch_OpenHatchSystem = (entities) => {
    function openLid() {
        if (entities.hatchLid.position[0] <= entities.TNT.position[0] +30 && entities.cannonBall.isBallMoving) {
            entities.hatchLid.position[0] += 1
        }
    }
    function closeLid() {
        if (entities.hatchLid.position[0] > entities.TNT.position[0] - 5) {
            entities.hatchBtnOne.isHit = false;
            entities.hatchBtnTwo.isHit = false;
            entities.hatchLid.position[0] -= 1
        }
    }
    function turnHatchBtnOn(entityName) {
        entities[entityName].color = colors.limeGreen;
        // depending on which type of button it is, Lower the switch
        if (entities[entityName].isTriggerOnTop) {
            entities[entityName].topPosition = -3;
        } else if (entities[entityName].isTriggerOnBottom) {
            entities[entityName].topPosition = 28;
        } else if (entities[entityName].isTriggerOnLeft) {
            entities[entityName].leftPosition = -5
        }
    }

    function turnHatchBtnOff(entityName) {
        entities[entityName].color = colors.bronzeStar;
        entities[entityName].isHit = false;
        // depending on which type of button it is, Raise the switch
        if(entities[entityName].isTriggerOnTop) {
            entities[entityName].topPosition = -8;
        } else if (entities[entityName].isTriggerOnBottom) {
            entities[entityName].topPosition = 33;
        } else if (entities[entityName].isTriggerOnLeft) {
            entities[entityName].leftPosition = -11
        }
    }

    

    // Listeners
    if (!entities.gameData.isGameOver) {
        // I can loop through keys and make this dynamic if I want to add many more buttons
        // Listen for Button One 
        if (entities.hatchBtnOne.isHit) {
            turnHatchBtnOn('hatchBtnOne');
            // openLid();
        }
        if (!entities.cannonBall.isBallMoving || !entities.hatchBtnOne.isHit) {
            turnHatchBtnOff('hatchBtnOne');
            closeLid();
        }
        // Listen for Button Two
        if (entities.hatchBtnTwo.isHit) {
            turnHatchBtnOn('hatchBtnTwo');
            // openLid();
        }
        if (!entities.cannonBall.isBallMoving || !entities.hatchBtnTwo.isHit) {
            turnHatchBtnOff('hatchBtnTwo');
            closeLid();
        }

        if (entities.hatchBtnOne.isHit && entities.hatchBtnTwo.isHit) {
            openLid();
        }
    }
    return entities;
}

export default doubleHatch_OpenHatchSystem;