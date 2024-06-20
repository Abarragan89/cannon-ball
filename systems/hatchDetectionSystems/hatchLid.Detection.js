import lineBallDetection from "../../utils/lineBallDetection";

const hatchLidDetectionSystem = (entities) => {
    // LEFT LINE OF HINDERANCE BOX
    const leftLineX1 = entities.hatchLid.position[0];
    const leftLineY1 = entities.hatchLid.position[1];
    const leftLineX2 = entities.hatchLid.position[0];
    const leftLineY2 = entities.hatchLid.position[1] + 15;

    // RIGHT LINE OF HINDERANCE BOX
    const rightLineX1 = entities.hatchLid.position[0] + 57;
    const rightLineY1 = entities.hatchLid.position[1];
    const rightLineX2 = entities.hatchLid.position[0] + 57;
    const rightLineY2 = entities.hatchLid.position[1] + 15;

    // BOTTOM LINE OF HINDERANCE BOX
    const bottomLineX1 = entities.hatchLid.position[0];
    const bottomLineY1 = entities.hatchLid.position[1] + 15;
    const bottomLineX2 = entities.hatchLid.position[0] + 57;
    const bottomLineY2 = entities.hatchLid.position[1] + 15;

    // TOP LINE OF HINDERANCE BOX
    const topLineX1 = entities.hatchLid.position[0];
    const topLineY1 = entities.hatchLid.position[1];
    const topLineX2 = entities.hatchLid.position[0] + 57;
    const topLineY2 = entities.hatchLid.position[1];


    // CIRCLE PROPERTIES
    const radius = +entities.cannonBall.cannonBallRadius;
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

    ////////////////// CHECKING FOR TOP WALL DETECTION /////////////////
    if (lineBallDetection(topLineX1, topLineY1, topLineX2, topLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] > 0) {
            cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1)
        }
    }

    return entities;
}

export default hatchLidDetectionSystem;