import lineBallDetection from "../utils/lineBallDetection";
import cannonBallBounce from "../utils/cannonBallBounce";
import isCircleInRectangle from "../utils/circleRectangleDetection";


const createDetectHinderanceSystem = (entities) => {

    // Creates Hinderance positioning and listens for detection
    function createHinderanceAndDetect(width, height, hinderanceName) {
        // LEFT LINE OF HINDERANCE BOX
        const leftLineX1 = entities[hinderanceName].position[0];
        const leftLineY1 = entities[hinderanceName].position[1];
        const leftLineX2 = entities[hinderanceName].position[0];
        const leftLineY2 = entities[hinderanceName].position[1] + height;

        // RIGHT LINE OF HINDERANCE BOX
        const rightLineX1 = entities[hinderanceName].position[0] + width;
        const rightLineY1 = entities[hinderanceName].position[1]
        const rightLineX2 = entities[hinderanceName].position[0] + width;
        const rightLineY2 = entities[hinderanceName].position[1] + height;

        // BOTTOM LINE OF HINDERANCE BOX
        const bottomLineX1 = entities[hinderanceName].position[0];
        const bottomLineY1 = entities[hinderanceName].position[1] + height;
        const bottomLineX2 = entities[hinderanceName].position[0] + width;
        const bottomLineY2 = entities[hinderanceName].position[1] + height;

        // TOP LINE OF HINDERANCE BOX
        const topLineX1 = entities[hinderanceName].position[0];
        const topLineY1 = entities[hinderanceName].position[1];
        const topLineX2 = entities[hinderanceName].position[0] + width;
        const topLineY2 = entities[hinderanceName].position[1];

        // CIRCLE PROPERTIES
        const radius = +entities.cannonBall.cannonBallRadius - 1;
        const circleX = entities.cannonBall.position[0] + radius;
        const circleY = entities.cannonBall.position[1] + radius;


        // // LEFT LINE OF HINDERANCE BOX
        // const leftLineX1 = entities[hinderanceName].position[0];
        // const leftLineY1 = entities[hinderanceName].position[1] + 3;
        // const leftLineX2 = entities[hinderanceName].position[0];
        // const leftLineY2 = entities[hinderanceName].position[1] + height;

        // // RIGHT LINE OF HINDERANCE BOX
        // const rightLineX1 = entities[hinderanceName].position[0] + width - 3;
        // const rightLineY1 = entities[hinderanceName].position[1] + 3;
        // const rightLineX2 = entities[hinderanceName].position[0] + width - 3;
        // const rightLineY2 = entities[hinderanceName].position[1] + height;

        // // BOTTOM LINE OF HINDERANCE BOX
        // const bottomLineX1 = entities[hinderanceName].position[0] + 3;
        // const bottomLineY1 = entities[hinderanceName].position[1] + height;
        // const bottomLineX2 = entities[hinderanceName].position[0] + width - 3;
        // const bottomLineY2 = entities[hinderanceName].position[1] + height;

        // // TOP LINE OF HINDERANCE BOX
        // const topLineX1 = entities[hinderanceName].position[0];
        // const topLineY1 = entities[hinderanceName].position[1];
        // const topLineX2 = entities[hinderanceName].position[0] + width - 3;
        // const topLineY2 = entities[hinderanceName].position[1];

        // // CIRCLE PROPERTIES
        // const radius = +entities.cannonBall.cannonBallRadius;
        // const circleX = entities.cannonBall.position[0] + radius;
        // const circleY = entities.cannonBall.position[1] + radius;

        // ////////////////    THESE IF STATEMENTS WORK UNTIL IT REACTES VERY HIGH VELOCITY //////////////////////
        ///////// CHECKING FOR LEFT WALL DETECTION ////////////////////////
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

        if (lineBallDetection(leftLineX1, leftLineY1, leftLineX2, leftLineY2, circleX, circleY, radius)) {
            if (entities.cannonBall.velocity[0] > 0) {
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0)
            }
        }






        // PRATICING CREATING DETECTION WITH 10px wide rectangle detections on all four sides
        //  This is the LEFT rectange hit box insdie the hinderance
        // ////////////////// CHECKING FOR LEFT WALL DETECTION //////////////////
        // const isInsideBox = isCircleInRectangle(circleX, circleY, radius, leftLineX1, leftLineY1, width, height)
        // const hinderanceLastHitDirection = entities[hinderanceName].lastHit
        // console.log(hinderanceLastHitDirection)
        // // Determine direction of cannonBall
        // if (isInsideBox) {
        //     // Determine direction of cannonBall
        //     if (entities.cannonBall.velocity[0] > 0 && hinderanceLastHitDirection !== 'left') {
        //         // CannonBall is coming from the left
        //         entities[hinderanceName].lastHit = 'left'
        //         cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0);
        //     } 
        //     else if (entities.cannonBall.velocity[0] < 0 && hinderanceLastHitDirection !== 'right') {
        //         // CannonBall is coming from the right
        //         entities[hinderanceName].lastHit = 'right'
        //         cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0);
        //     } 
        //     else if (entities.cannonBall.velocity[1] > 0 && hinderanceLastHitDirection !== 'top') {
        //         // CannonBall is coming from the top
        //         entities[hinderanceName].lastHit = 'top'
        //         cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);                
        //     } 
        //     else if (entities.cannonBall.velocity[1] < 0 && hinderanceLastHitDirection !== 'bottom') {
        //         // CannonBall is coming from the bottom
        //         entities[hinderanceName].lastHit = 'bottom'
        //         cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);
        //     }
        // }

        // const isVerticalBound = 
        // if (isInsideBox) {
        //     if (entities.cannonBall.velocity[0] > 0) {
        //         cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0)
        //     } 
        // ////////////////// CHECKING FOR Right WALL DETECTION //////////////////
        // } else if (entities.cannonBall.velocity[1] < 0) {
        // cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0)
    }
    // if (isCircleInRectangle(circleX, circleY, radius, rightLineX1, rightLineY1, width, height)) {
    //     if (entities.cannonBall.velocity[0] < 0) {
    //     }
    // } 

    // ////////////////// CHECKING FOR RIGHT WALL DETECTION //////////////////
    // if (lineBallDetection(rightLineX1, rightLineY1, rightLineX2, rightLineY2, circleX, circleY, radius)) {
    //     if (entities.cannonBall.velocity[0] < 0) {
    //         cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0)
    //     }
    // }

    // ////////////////// CHECKING FOR BOTTOM WALL DETECTION /////////////////
    // if (lineBallDetection(bottomLineX1, bottomLineY1, bottomLineX2, bottomLineY2, circleX, circleY, radius)) {

    //     if (entities.cannonBall.velocity[1] < 0) {
    //         cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1)
    //     }
    // }

    // ////////////////// CHECKING FOR TOP WALL DETECTION /////////////////
    // if (lineBallDetection(topLineX1, topLineY1, topLineX2, topLineY2, circleX, circleY, radius)) {
    //     if (entities.cannonBall.velocity[1] > 0) {
    //         cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1)
    //     }
    // }

    // if (lineBallDetection(leftLineX1, leftLineY1, leftLineX2, leftLineY2, circleX, circleY, radius)) {
    //     if (entities.cannonBall.velocity[0] > 0) {
    //         cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0)
    //     }
    // }



// Get array of all it is keys in Entities
const entityObjs = Object.keys(entities)
// Loop through the keys in entities
entityObjs.forEach((hinderanceName, index) => {
    // Only run if it has a width (implies hinderance)
    if (entities[hinderanceName].width) {
        // get the values from the entity
        const { width, height } = entities[hinderanceName];
        // create and listen for detection
        createHinderanceAndDetect(width, height, hinderanceName)
    }
})

return entities;
}

export default createDetectHinderanceSystem;