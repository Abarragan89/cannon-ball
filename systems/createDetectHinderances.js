// import lineBallDetection from "../utils/lineBallDetection";
import cannonBallBounce from "../utils/cannonBallBounce";
import isCircleInRectangle from "../utils/circleRectangleDetection";


const createDetectHinderanceSystem = (entities) => {
    // Helper function

    // Creates Hinderance positioning and listens for detection
    function createHinderanceAndDetect(width, height, hinderanceName) {
        const hindXPos = entities[hinderanceName].position[0];
        const hindYPos = entities[hinderanceName].position[1];
        // LEFT LINE OF HINDERANCE BOX
        const leftLineX1 = hindXPos;
        const leftLineY1 = hindYPos;

        // const leftLineX2 = entities[hinderanceName].position[0];
        // const leftLineY2 = entities[hinderanceName].position[1] + height;

        // // RIGHT LINE OF HINDERANCE BOX
        // const rightLineX1 = entities[hinderanceName].position[0] + width;
        // const rightLineY1 = entities[hinderanceName].position[1]
        // const rightLineX2 = entities[hinderanceName].position[0] + width;
        // const rightLineY2 = entities[hinderanceName].position[1] + height;

        // // BOTTOM LINE OF HINDERANCE BOX
        // const bottomLineX1 = entities[hinderanceName].position[0];
        // const bottomLineY1 = entities[hinderanceName].position[1] + height;
        // const bottomLineX2 = entities[hinderanceName].position[0] + width;
        // const bottomLineY2 = entities[hinderanceName].position[1] + height;

        // // TOP LINE OF HINDERANCE BOX
        // const topLineX1 = entities[hinderanceName].position[0];
        // const topLineY1 = entities[hinderanceName].position[1];
        // const topLineX2 = entities[hinderanceName].position[0] + width;
        // const topLineY2 = entities[hinderanceName].position[1];

        // CIRCLE PROPERTIES
        const radius = +entities.cannonBall.cannonBallRadius - 1;
        const circleX = entities.cannonBall.position[0] + radius;
        const circleY = entities.cannonBall.position[1] + radius;

        const prevCircleX = entities.cannonBall.prevPosition[0] + radius;
        const prevCircleY = entities.cannonBall.prevPosition[1] + radius;



        function determineEntrySide() {
            // Only if previous position was outisde the X and current is inside the X
            if ((prevCircleX + radius) <= hindXPos && (circleX + radius) > hindXPos) {
                entities.cannonBall.lastDirection = 'left'
                return 'left';
            }
            else if ((prevCircleX - radius) >= hindXPos + width && (circleX - radius) < hindXPos + width) {
                entities.cannonBall.lastDirection = 'right'
                return 'right';
            }
            else if ((prevCircleY + radius) <= hindYPos && (circleY + radius) > hindYPos) {
                entities.cannonBall.lastDirection = 'top';
                return 'top'
            }
            else if ((prevCircleY - radius) >= hindYPos && (circleY - radius) > hindYPos) {
                entities.cannonBall.lastDirection = 'bottom'
                return 'bottom';
            }
            else {
                return 'inside'; // Circle is already inside
            }
        }


        // ////////////////    THESE IF STATEMENTS WORK UNTIL IT REACTES VERY HIGH VELOCITY //////////////////////
        ///////// CHECKING FOR LEFT WALL DETECTION ////////////////////////
        // if (lineBallDetection(leftLineX1, leftLineY1, leftLineX2, leftLineY2, circleX, circleY, radius)) {
        //     if (entities.cannonBall.velocity[0] > 0) {
        //         cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0)
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






        // PRATICING CREATING DETECTION WITH 10px wide rectangle detections on all four sides
        //  This is the LEFT rectange hit box insdie the hinderance
        ////////////////// CHECKING FOR LEFT WALL DETECTION //////////////////
        const isInsideBox = isCircleInRectangle(circleX, circleY, radius, leftLineX1, leftLineY1, width, height)
        const lastFrame = isCircleInRectangle(prevCircleX, prevCircleY, radius, leftLineX1, leftLineY1, width, height)
        const lastDirection = entities.cannonBall.lastDirection;
        // const lastFrame = determineEntrySide();

        const entrySide = determineEntrySide();

        // console.log('last frame', isLastFrameInsideRect)

        // Determine direction of cannonBall
        if (isInsideBox && !lastFrame) {

            // console.log('entry', isLastFrameInsideRect)
            console.log('last direction', lastDirection)
            if (entrySide === 'left' && lastDirection !== 'left') {
                console.log('hitfrom:', entrySide)
                console.log('hinderace', hinderanceName)
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0);
            }
            else if (entrySide === 'right' && lastDirection !== 'right') {
                console.log('hitfrom:', entrySide)
                console.log('hinderace', hinderanceName)
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0);
            }
            else if (entrySide === 'top' && lastDirection !== 'top') {
                console.log('hitfrom:', entrySide)
                console.log('hinderace', hinderanceName)
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);
            }
            // // CannonBall is coming from the bottom
            else if (entrySide === 'bottom' || lastDirection !== 'bottom') {
                console.log('hit from', entrySide)
                console.log('hinderace', hinderanceName)
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);
            }
            // // CannonBall is coming from the top
            // else if (cannonBallVelocityY < 0) {
            //     console.log('hit from top')
            //     cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);
            // }
        }
    }

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




