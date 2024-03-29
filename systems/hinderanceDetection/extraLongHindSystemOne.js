//  This only needs to detect bottom since it works as the roof;
import { Dimensions } from "react-native";
const { width } = Dimensions.get('window');
import lineBallDetection from "../../utils/lineBallDetection";
import cannonBallBounce from "../../utils/cannonBallBounce";

const extraLongHindSystemOne = (entities) => {
    // BOTTOM LINE OF HINDERANCE BOX
    const bottomLineX1 = entities.extraLongHindOne.position[0];
    const bottomLineY1 = entities.extraLongHindOne.position[1] + 10;
    const bottomLineX2 = entities.extraLongHindOne.position[0] + width + 10;
    const bottomLineY2 = entities.extraLongHindOne.position[1] + 10;

    // CIRCLE PROPERTIES
    const radius = 10;
    const circleX = entities.cannonBall.position[0] + 10;
    const circleY = entities.cannonBall.position[1] + 10;
    
        ////////////////// CHECKING FOR BOTTOM WALL DETECTION /////////////////
        if (lineBallDetection(bottomLineX1, bottomLineY1, bottomLineX2, bottomLineY2, circleX, circleY, radius)) {
            if (entities.cannonBall.velocity[1] < 0) {
                cannonBallBounce(entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1)
            }
        }
    
    return entities;
}

export default extraLongHindSystemOne;