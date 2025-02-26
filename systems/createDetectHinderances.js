import cannonBallBounce from "../utils/cannonBallBounce";
import isCircleInRectangle from "../utils/circleRectangleDetection";


const createDetectHinderanceSystem = (entities) => {
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
                (circleX - radius) < hindXPos + width
            ) {
                entities.cannonBall.lastDirection = 'right'
                return 'right';
            }
            else if (
                // Check to see if the previous position was outside and the current is inside the rect
                (prevCircleY + radius) <= hindYPos &&
                (circleY + radius) > hindYPos
            ) {
                entities.cannonBall.lastDirection = 'top';
                return 'top'
            }
            else if (
                // Check to see if the previous position was outside and the current is inside the rect
                ((prevCircleY - radius) >= hindYPos &&
                    (circleY - radius) > hindYPos)
            ) {
                entities.cannonBall.lastDirection = 'bottom'
                return 'bottom';
            }
            else {
                return 'inside'; // Circle is already inside
            }
        }

        ////////////////// CHECKING FOR LEFT WALL DETECTION //////////////////
        // 1. Check the current ball-rect postition
        const isInsideBox = isCircleInRectangle(circleX, circleY, radius, leftLineX1, leftLineY1, width, height)
        // 2. Check the previous ball-rect position
        const lastFrame = isCircleInRectangle(prevCircleX, prevCircleY, radius, leftLineX1, leftLineY1, width, height)
        const entrySide = determineEntrySide();

        // Determine direction of cannonBall
        if (isInsideBox && !lastFrame) {
            if (entrySide === 'left' 
                // || (lineBallDetection(leftLineX1, leftLineY1, leftLineX2, leftLineY2, circleX, circleY, radius) && entities.cannonBall.velocity[0] > 0)
            ) {
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0, hinderanceName);
                // console.log('hit left')
            }
            else if (entrySide === 'right' 
                // || (lineBallDetection(rightLineX1, rightLineY1, rightLineX2, rightLineY2, circleX, circleY, radius) && entities.cannonBall.velocity[0] < 0)
            ) {
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0, hinderanceName);
                // console.log('hit right')
            }
            else if (entrySide === 'top' 
                // || (lineBallDetection(topLineX1, topLineY1, topLineX2, topLineY2, circleX, circleY, radius) && entities.cannonBall.velocity[1] > 0)
            ) {
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1, hinderanceName);
                // console.log('top')
            }
            // // CannonBall is coming from the bottom
            else if (entrySide === 'bottom' 
                // || (lineBallDetection(bottomLineX1, bottomLineY1, bottomLineX2, bottomLineY2, circleX, circleY, radius) && entities.cannonBall.velocity[1] < 0)
            ) {
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1, hinderanceName);
                // console.log('bottom')
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




