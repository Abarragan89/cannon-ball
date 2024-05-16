import lineBallDetection from "../../utils/lineBallDetection";
import cannonBallBounce from "../../utils/cannonBallBounce";

const hatchBoxDetectionSystem = (entities) => {
    // LEFT LINE OF HATCH BOX
    // I do minus 15 for rightLineY1 so it bounces on the lid side which is 15px tall
    const leftLineX1 = entities.hatchBox.position[0];
    const leftLineY1 = entities.hatchBox.position[1] - 15;
    const leftLineX2 = entities.hatchBox.position[0];
    const leftLineY2 = entities.hatchBox.position[1] + 60;

    // RIGHT LINE OF HATCH BOX
    // I do minus 15 for rightLineY1 so it bounces on the lid side which is 15px tall
    const rightLineX1 = entities.hatchBox.position[0] + 60;
    const rightLineY1 = entities.hatchBox.position[1] - 15;
    const rightLineX2 = entities.hatchBox.position[0] + 60;
    const rightLineY2 = entities.hatchBox.position[1] + 60;

    // BOTTOM LINE OF HATCH BOX
    // same as bottomLine, I didn't make the coordinate exactly based on the 40px size of Hinderance
    const bottomLineX1 = entities.hatchBox.position[0];
    const bottomLineY1 = entities.hatchBox.position[1] + 60;
    const bottomLineX2 = entities.hatchBox.position[0] + 60;
    const bottomLineY2 = entities.hatchBox.position[1] + 60;

    // TOP Left LINE OF HATCH BOX
    const topLeftLineX1 = entities.hatchBox.position[0];
    const topLeftLineY1 = entities.hatchBox.position[1];
    const topLeftLineX2 = entities.hatchBox.position[0] + 2;
    const topLeftLineY2 = entities.hatchBox.position[1];

    // TOP Right LINE OF HATCH BOX
    const topRightLineX1 = entities.hatchBox.position[0] + 52
    const topRightLineY1 = entities.hatchBox.position[1];
    const topRightLineX2 = entities.hatchBox.position[0] + 54;
    const topRightLineY2 = entities.hatchBox.position[1];

    // CIRCLE PROPERTIES
    const radius = 10;
    const circleX = entities.cannonBall.position[0] + radius;
    const circleY = entities.cannonBall.position[1] + radius;

    ///////////// CHECKING FOR LEFT WALL DETECTION ////////////////////////
    if (lineBallDetection(leftLineX1, leftLineY1, leftLineX2, leftLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[0] > 0) {
            cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0)
        }
    }

    ////////////////// CHECKING FOR RIGHT WALL DETECTION //////////////////
    if (lineBallDetection(rightLineX1, rightLineY1, rightLineX2, rightLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[0] < 0) {
            cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0)
        }
    }

    ////////////////// CHECKING FOR BOTTOM WALL DETECTION /////////////////
    if (lineBallDetection(bottomLineX1, bottomLineY1, bottomLineX2, bottomLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] < 0) {
            cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1)
        }
    }

    ////////////////// CHECKING FOR LEFT TOP WALL DETECTION /////////////////
    if (lineBallDetection(topLeftLineX1, topLeftLineY1, topLeftLineX2, topLeftLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] > 0) {
            cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1)
        }
    }

    ////////////////// CHECKING FOR Right TOP WALL DETECTION /////////////////
    if (lineBallDetection(topRightLineX1, topRightLineY1, topRightLineX2, topRightLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] > 0) {
            cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1)
        }
    }

    return entities;
}

export default hatchBoxDetectionSystem;