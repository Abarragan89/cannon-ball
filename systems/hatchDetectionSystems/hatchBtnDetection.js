import isCircleInRectangle from "../../utils/circleRectangleDetection";
import cannonBallBounce from "../../utils/cannonBallBounce";
import lineBallDetection from "../../utils/lineBallDetection";


const createDetectHinderanceSystem = (entities) => {
    // Creates Hinderance positioning and listens for detection
    function createHinderanceAndDetect(width, height, hinderanceName) {
        const hindXPos = entities.hatchBtn.position[0];
        const hindYPos = entities.hatchBtn.position[1];
        // LEFT LINE OF HINDERANCE BOX
        const leftLineX1 = hindXPos;
        const leftLineY1 = hindYPos;

        const leftLineX2 = entities.hatchBtn.position[0];
        const leftLineY2 = entities.hatchBtn.position[1] + height;

        // RIGHT LINE OF HINDERANCE BOX
        const rightLineX1 = entities.hatchBtn.position[0] + width;
        const rightLineY1 = entities.hatchBtn.position[1]
        const rightLineX2 = entities.hatchBtn.position[0] + width;
        const rightLineY2 = entities.hatchBtn.position[1] + height;

        // BOTTOM LINE OF HINDERANCE BOX
        const bottomLineX1 = entities.hatchBtn.position[0];
        const bottomLineY1 = entities.hatchBtn.position[1] + height;
        const bottomLineX2 = entities.hatchBtn.position[0] + width;
        const bottomLineY2 = entities.hatchBtn.position[1] + height;

        // TOP LINE OF HINDERANCE BOX
        const topLineX1 = entities.hatchBtn.position[0];
        const topLineY1 = entities.hatchBtn.position[1];
        const topLineX2 = entities.hatchBtn.position[0] + width;
        const topLineY2 = entities.hatchBtn.position[1];

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

        // PRATICING CREATING DETECTION WITH 10px wide rectangle detections on all four sides
        //  This is the LEFT rectange hit box insdie the hinderance
        ////////////////// CHECKING FOR LEFT WALL DETECTION //////////////////
        // 1. Check the current ball-rect postition
        const isInsideBox = isCircleInRectangle(circleX, circleY, radius, leftLineX1, leftLineY1, width, height)
        // 2. Check the previous ball-rect position
        const lastFrame = isCircleInRectangle(prevCircleX, prevCircleY, radius, leftLineX1, leftLineY1, width, height)
        const entrySide = determineEntrySide();

        // Determine direction of cannonBall
        if (isInsideBox && !lastFrame) {
            if (entrySide === 'left') {
                console.log('hitfrom left:', entrySide);
                console.log('hinderace', hinderanceName);
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0);
                if (entities.hatchBtn.isTriggerOnLeft) {
                    entities.hatchBtn.isHit = true;
                }
            }
            else if (entrySide === 'right') {
                console.log('hitfrom right:', entrySide)
                console.log('hinderace', hinderanceName)
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0);
                if (entities.hatchBtn.isTriggerOnRight) {
                    entities.hatchBtn.isHit = true;
                }
            }
            else if (entrySide === 'top') {
                console.log('hitfrom top', entrySide)
                console.log('hinderace', hinderanceName)
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);
                if (entities.hatchBtn.isTriggerOnTop) {
                    entities.hatchBtn.isHit = true;
                }
            }
            // // CannonBall is coming from the bottom
            else if (entrySide === 'bottom') {
                console.log('hit from bottom', entrySide)
                console.log('hinderace', hinderanceName)
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);
                if (entities.hatchBtn.isTriggerOnBottom) {
                    entities.hatchBtn.isHit = true;
                }
            }
        }


        //////////////    THESE IF STATEMENTS WORK UNTIL IT REACTES VERY HIGH VELOCITY. THE OG OF ALGORITHMS //////////////////////
        ///// CHECKING FOR LEFT WALL DETECTION ////////////////////////
        if (lineBallDetection(leftLineX1, leftLineY1, leftLineX2, leftLineY2, circleX, circleY, radius)) {
            if (entities.cannonBall.velocity[0] > 0) {
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0);
                if (entities.hatchBtn.isTriggerOnLeft) {
                    entities.hatchBtn.isHit = true;
                }
            }
        }
        ////////////////// CHECKING FOR RIGHT WALL DETECTION //////////////////
        if (lineBallDetection(rightLineX1, rightLineY1, rightLineX2, rightLineY2, circleX, circleY, radius)) {
            if (entities.cannonBall.velocity[0] < 0) {
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0)
                if (entities.hatchBtn.isTriggerOnRight) {
                    entities.hatchBtn.isHit = true;
                }
            }
        }

        ////////////////// CHECKING FOR BOTTOM WALL DETECTION /////////////////
        if (lineBallDetection(bottomLineX1, bottomLineY1, bottomLineX2, bottomLineY2, circleX, circleY, radius)) {
            if (entities.cannonBall.velocity[1] < 0) {
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1)
                if (entities.hatchBtn.isTriggerOnBottom) {
                    entities.hatchBtn.isHit = true;
                }
            }
        }

        ////////////////// CHECKING FOR TOP WALL DETECTION /////////////////
        if (lineBallDetection(topLineX1, topLineY1, topLineX2, topLineY2, circleX, circleY, radius)) {
            if (entities.cannonBall.velocity[1] > 0) {
                cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);
                if (entities.hatchBtn.isTriggerOnTop) {
                    entities.hatchBtn.isHit = true;
                }
            }
        }
    }

    createHinderanceAndDetect(40, 40, 'hatchBtn')

    return entities;
}

export default createDetectHinderanceSystem;