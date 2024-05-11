import lineBallDetection from "../../utils/lineBallDetection";

const hatchBtnTwoDetectionSystem = (entities) => {
    // LEFT LINE OF HINDERANCE BOX
    const leftLineX1 = entities.hatchBtnTwo.position[0];
    const leftLineY1 = entities.hatchBtnTwo.position[1];
    const leftLineX2 = entities.hatchBtnTwo.position[0];
    const leftLineY2 = entities.hatchBtnTwo.position[1] + 40;

    // RIGHT LINE OF HINDERANCE BOX
    const rightLineX1 = entities.hatchBtnTwo.position[0] + 40;
    const rightLineY1 = entities.hatchBtnTwo.position[1];
    const rightLineX2 = entities.hatchBtnTwo.position[0] + 40;
    const rightLineY2 = entities.hatchBtnTwo.position[1] + 40;

    // BOTTOM LINE OF HINDERANCE BOX
    const bottomLineX1 = entities.hatchBtnTwo.position[0];
    const bottomLineY1 = entities.hatchBtnTwo.position[1] + 40;
    const bottomLineX2 = entities.hatchBtnTwo.position[0] + 40;
    const bottomLineY2 = entities.hatchBtnTwo.position[1] + 40;

    // TOP LINE OF HINDERANCE BOX
    const topLineX1 = entities.hatchBtnTwo.position[0];
    const topLineY1 = entities.hatchBtnTwo.position[1];
    const topLineX2 = entities.hatchBtnTwo.position[0] + 40;
    const topLineY2 = entities.hatchBtnTwo.position[1];


    // CIRCLE PROPERTIES
    const radius = 10;
    const circleX = entities.cannonBall.position[0] + radius;
    const circleY = entities.cannonBall.position[1] + radius;

    ///////////// CHECKING FOR LEFT WALL DETECTION ////////////////////////
    if (lineBallDetection(leftLineX1, leftLineY1, leftLineX2, leftLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[0] > 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0];
            if (entities.hatchBtnTwo.isTriggerOnLeft) {
                entities.hatchBtnTwo.isHit = true;
            }
        }
    }


    ////////////////// CHECKING FOR RIGHT WALL DETECTION //////////////////
    if (lineBallDetection(rightLineX1, rightLineY1, rightLineX2, rightLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[0] < 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0];
            if (entities.hatchBtnTwo.isTriggerOnRight) {
                entities.hatchBtnTwo.isHit = true;
            }
        }
    }

    ////////////////// CHECKING FOR BOTTOM DETECTION //////////////////
    if (lineBallDetection(bottomLineX1, bottomLineY1, bottomLineX2, bottomLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] < 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1]
            if (entities.hatchBtnTwo.isTriggerOnBottom) {
                entities.hatchBtnTwo.isHit = true;
            }
        }
    }

    ////////////////// CHECKING FOR TOP WALL DETECTION /////////////////
    if (lineBallDetection(topLineX1, topLineY1, topLineX2, topLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] > 0) {
            // add to bounce count
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1] * entities.gameData.bounceLevel
            if (entities.hatchBtnTwo.isTriggerOnTop) {
                entities.hatchBtnTwo.isHit = true;
            }
        }
    }

    return entities;
}

export default hatchBtnTwoDetectionSystem;