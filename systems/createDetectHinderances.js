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
        const radius = +entities.cannonBall.cannonBallRadius;
        const circleX = entities.cannonBall.position[0] + radius;
        const circleY = entities.cannonBall.position[1] + radius;

        const prevCircleX = entities.cannonBall.prevPosition[0] + radius;
        const prevCircleY = entities.cannonBall.prevPosition[1] + radius;

        const nextCircleX = entities.cannonBall.nextPosition[0];
        const nextCircleY = entities.cannonBall.nextPosition[1];



        ///////////////// ATTEMPT TO USE NEXT POSITION AND PARALLEL LINES TO DETECT ///////////////////
        // // 1. Caculate all four points from current Circle to Next Circle
        // function makeRectCurrentToNext(x1, y1, x2, y2, radius) {
        //     // helper functiont to calculate end points once slope has been determined
        //     function calculateEndpoint(x1, y1, slope, radius) {
        //         var deltaX = radius / Math.sqrt(1 + Math.pow(slope, 2));
        //         var deltaY = slope * deltaX;
        //         var x2 = x1 + deltaX;
        //         var y2 = y1 + deltaY;
        //         return { x: x2, y: y2 };
        //     }
        //     let endPointCurrent;
        //     let endPointReverseCurrent;
        //     let endPointNext;
        //     let endPointReverseNext;
        //     // calculate slope 
        //     let slope = (y2 - y1) / (x2 - x1);
        //     // get the negative reciprocal of the slope
        //     slope = -1 / slope;
        //     // calculate the endpoint of the line
        //     if (y1 === y2) {
        //         endPointCurrent = { x: x1, y: y1 - radius };
        //         endPointReverseCurrent = { x: x1, y: y1 + radius };

        //         endPointNext = { x: x2, y: y2 - radius };
        //         endPointReverseNext = { x: x2, y: y2 + radius };
        //     } else {
        //         // Calculate the endpoints for 
        //         endPointCurrent = calculateEndpoint(x1, y1, slope, radius);
        //         endPointReverseCurrent = calculateEndpoint(x1, y1, slope, -radius);

        //         endPointNext = calculateEndpoint(x2, y2, slope, radius);
        //         endPointReverseNext = calculateEndpoint(x2, y2, slope, -radius);
        //     }
        //     return { endPointCurrent, endPointReverseCurrent, endPointNext, endPointReverseNext }
        // }

        // // Gather the coordinates for the 4 corners of the rectangle made by two circles
        // const rectangleCoordinatePoints = makeRectCurrentToNext(circleX, circleY, nextCircleX, nextCircleY, radius);

        // // Coordinates for current ball position
        // const endPointCurrentX1 = rectangleCoordinatePoints.endPointCurrent.x;
        // const endPointCurrentY1 = rectangleCoordinatePoints.endPointCurrent.y;
        // const endPointCurrentX2 = rectangleCoordinatePoints.endPointReverseCurrent.x;
        // const endPointCurrentY2 = rectangleCoordinatePoints.endPointReverseCurrent.y

        // // Coordinates for next ball position
        // const endPointNextX1 = rectangleCoordinatePoints.endPointNext.x;
        // const endPointNextY1 = rectangleCoordinatePoints.endPointNext.y;
        // const endPointNextX2 = rectangleCoordinatePoints.endPointReverseNext.x;
        // const endPointNextY2 = rectangleCoordinatePoints.endPointReverseNext.y

        // // Check if any sides have collided with rectangle


        // console.log(endPointCurrentX1, endPointCurrentY1, endPointCurrentX2, endPointCurrentY2, endPointNextX1, endPointNextY1, endPointNextX2, endPointNextY2)

        // 3. Accept the line that is closest to the current circle position
        // 4. 


        //////////////// DETECT ENTRY POINT BY USING PREVIOUS POSITION. WORKS EXCEPT ON EDGES ////////////////////////
        function determineEntrySide() {
            // Only if previous position was outisde the X and current is inside the X
            if (
                // Check to see if the previous position was outside and the current is inside the rect
                ((prevCircleX + radius) <= hindXPos) &&
                ((circleX + radius) > hindXPos) &&
                // Check to see if it is within range of the side
                (prevCircleY + radius >= leftLineY1) &&
                (prevCircleY - radius <= leftLineY2)
            ) {
                entities.cannonBall.lastDirection = 'left';
                return 'left';
            }

            else if (
                // Check to see if the previous position was outside and the current is inside the rect
                (prevCircleX - radius) >= hindXPos + width &&
                (circleX - radius) < hindXPos + width &&
                // Check to see if it is within range of the side
                (prevCircleY + radius >= leftLineY1) &&
                (prevCircleY - radius <= leftLineY2)
            ) {
                entities.cannonBall.lastDirection = 'right'
                return 'right';
            }
            else if (
                // Check to see if the previous position was outside and the current is inside the rect
                (prevCircleY + radius) <= hindYPos &&
                (circleY + radius) > hindYPos &&
                // Check to see if it is within range of the side
                (prevCircleX + radius < topLineX2) &&
                (prevCircleX + radius > topLineX1)
            ) {
                entities.cannonBall.lastDirection = 'top';
                return 'top'
            }
            else if (
                // Check to see if the previous position was outside and the current is inside the rect
                ((prevCircleY - radius) >= hindYPos &&
                    (circleY - radius) > hindYPos) &&
                // Check to see if it is within range of the side
                // Check to see if it is within range of the side
                (prevCircleX + radius < topLineX2) &&
                (prevCircleX + radius > topLineX1)
            ) {
                entities.cannonBall.lastDirection = 'bottom'
                return 'bottom';
            }
            else {
                return 'inside'; // Circle is already inside
            }
        }
        determineEntrySide();
        // PRATICING CREATING DETECTION WITH 10px wide rectangle detections on all four sides
        //  This is the LEFT rectange hit box insdie the hinderance
        ////////////////// CHECKING FOR LEFT WALL DETECTION //////////////////
        const isInsideBox = isCircleInRectangle(circleX, circleY, radius, leftLineX1, leftLineY1, width, height)
        const lastDirection = entities.cannonBall.lastDirection;
        // const lastFrame = determineEntrySide();
        const lastFrame = isCircleInRectangle(prevCircleX, prevCircleY, radius, leftLineX1, leftLineY1, width, height)

        const entrySide = determineEntrySide();

        // Determine direction of cannonBall
        if (isInsideBox && !lastFrame) {

            // console.log('entry', isLastFrameInsideRect)
            console.log('last direction', lastDirection)
            if (entrySide === 'left') {
                console.log('hitfrom left:', entrySide);
                console.log('hinderace', hinderanceName);
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0);
            }
            else if (entrySide === 'right') {
                console.log('hitfrom rightr:', entrySide)
                console.log('hinderace', hinderanceName)
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0);
            }
            else if (entrySide === 'top') {
                console.log('hitfrom top', entrySide)
                console.log('hinderace', hinderanceName)
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);
            }
            // // CannonBall is coming from the bottom
            else if (entrySide === 'bottom') {
                console.log('hit from bottom', entrySide)
                console.log('hinderace', hinderanceName)
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);
            }
            // CannonBall is coming from the top

        }


        //////////////    THESE IF STATEMENTS WORK UNTIL IT REACTES VERY HIGH VELOCITY. THE OG OF ALGORITHMS //////////////////////
        ///// CHECKING FOR LEFT WALL DETECTION ////////////////////////
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




