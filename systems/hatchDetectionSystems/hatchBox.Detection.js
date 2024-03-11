import lineBallDetection from "../../utils/lineBallDetection";

const hatchBoxDetectionSystem = (entities) => {
    // LEFT LINE OF HINDERANCE BOX
    const leftLineX1 = entities.hatchBox.position[0];
    const leftLineY1 = entities.hatchBox.position[1];
    const leftLineX2 = entities.hatchBox.position[0];
    const leftLineY2 = entities.hatchBox.position[1] + 60;

    // RIGHT LINE OF HINDERANCE BOX
    // same as rightLine, I didn't make the coordinate exactly based on the 40px size of Hinderance
    const rightLineX1 = entities.hatchBox.position[0] + 60;
    const rightLineY1 = entities.hatchBox.position[1];
    const rightLineX2 = entities.hatchBox.position[0] + 60;
    const rightLineY2 = entities.hatchBox.position[1] + 60;

    // BOTTOM LINE OF HINDERANCE BOX
    // same as bottomLine, I didn't make the coordinate exactly based on the 40px size of Hinderance
    const bottomLineX1 = entities.hatchBox.position[0];
    const bottomLineY1 = entities.hatchBox.position[1] + 60;
    const bottomLineX2 = entities.hatchBox.position[0] + 60;
    const bottomLineY2 = entities.hatchBox.position[1] + 60;

    // TOP Left LINE OF HINDERANCE BOX
    const topLeftLineX1 = entities.hatchBox.position[0];
    const topLeftLineY1 = entities.hatchBox.position[1];
    const topLeftLineX2 = entities.hatchBox.position[0] + 3;
    const topLeftLineY2 = entities.hatchBox.position[1];

    // TOP Right LINE OF HINDERANCE BOX
    const topRightLineX1 = entities.hatchBox.position[0] + 52
    const topRightLineY1 = entities.hatchBox.position[1];
    const topRightLineX2 = entities.hatchBox.position[0] + 54;
    const topRightLineY2 = entities.hatchBox.position[1];

    // CIRCLE PROPERTIES
    const radius = 10;
    const circleX = entities.cannonBall.position[0] + 10;
    const circleY = entities.cannonBall.position[1] + 10;

    ///////////// CHECKING FOR LEFT WALL DETECTION ////////////////////////
    if (lineBallDetection(leftLineX1, leftLineY1, leftLineX2, leftLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[0] > 0) { 
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
        }
    }

    ////////////////// CHECKING FOR RIGHT WALL DETECTION //////////////////
    if (lineBallDetection(rightLineX1, rightLineY1, rightLineX2, rightLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[0] < 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0];
        }
    }

    ////////////////// CHECKING FOR BOTTOM WALL DETECTION /////////////////
    if (lineBallDetection(bottomLineX1, bottomLineY1, bottomLineX2, bottomLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] < 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1]
        }
    }
    
    ////////////////// CHECKING FOR LEFT TOP WALL DETECTION /////////////////
    if (lineBallDetection(topLeftLineX1, topLeftLineY1, topLeftLineX2, topLeftLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] > 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1] * entities.gameData.bounceLevel
        }
    }

    ////////////////// CHECKING FOR Right TOP WALL DETECTION /////////////////
    if (lineBallDetection(topRightLineX1, topRightLineY1, topRightLineX2, topRightLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] > 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1] * entities.gameData.bounceLevel
        }
    }

    return entities;
}

export default hatchBoxDetectionSystem;