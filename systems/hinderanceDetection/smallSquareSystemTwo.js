import lineBallDetection from "../../utils/lineBallDetection";

const smallSquareSystemTwo = (entities) => {
    // LEFT LINE OF HINDERANCE BOX
    const leftLineX1 = entities.squareHindTwo.position[0];
    const leftLineY1 = entities.squareHindTwo.position[1];
    const leftLineX2 = entities.squareHindTwo.position[0];
    const leftLineY2 = entities.squareHindTwo.position[1] + 40;

    // RIGHT LINE OF HINDERANCE BOX
    // same as rightLine, I didn't make the coordinate exactly based on the 40px size of Hinderance
    const rightLineX1 = entities.squareHindTwo.position[0] + 40;
    const rightLineY1 = entities.squareHindTwo.position[1];
    const rightLineX2 = entities.squareHindTwo.position[0] + 40;
    const rightLineY2 = entities.squareHindTwo.position[1] + 40;


    // BOTTOM LINE OF HINDERANCE BOX
    // same as bottomLine, I didn't make the coordinate exactly based on the 40px size of Hinderance
    const bottomLineX1 = entities.squareHindTwo.position[0];
    const bottomLineY1 = entities.squareHindTwo.position[1] + 40;
    const bottomLineX2 = entities.squareHindTwo.position[0] + 40;
    const bottomLineY2 = entities.squareHindTwo.position[1] + 40;

    // TOP LINE OF HINDERANCE BOX
    const topLineX1 = entities.squareHindTwo.position[0];
    const topLineY1 = entities.squareHindTwo.position[1];
    const topLineX2 = entities.squareHindTwo.position[0] + 40;
    const topLineY2 = entities.squareHindTwo.position[1];

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
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
        }
    }

    ////////////////// CHECKING FOR BOTTOM WALL DETECTION /////////////////
    if (lineBallDetection(bottomLineX1, bottomLineY1, bottomLineX2, bottomLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] < 0) {
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1]
        }
    }

    ////////////////// CHECKING FOR TOP WALL DETECTION /////////////////
    if (lineBallDetection(topLineX1, topLineY1, topLineX2, topLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] > 0) {
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1] * entities.gameData.bounceLevel
        }
    }

    return entities;
}

export default smallSquareSystemTwo;