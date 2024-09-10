import cannonBallBounce from '../utils/cannonBallBounce';
import isCircleInRectangle from "../utils/circleRectangleDetection";

const TNTDetectionSystem = (entities) => {
    /////////////////// HELPER FUNCTIONS TO END GAME //////////////
    function calculateAccuracy() {
        // coordinates for the bottom of the ball
        const ballXCoord = entities.cannonBall.position[0] + +entities.cannonBall.cannonBallRadius;
        // coordinate for the top center of the TNT
        const tntXCoord = entities.TNT.position[0] + 15;
        // calculate distance for both X positions
        const accuracyAmount = Math.abs(ballXCoord - tntXCoord).toFixed(2)

        // Less than 1 px
        if (accuracyAmount < 1) {
            entities.cannonBall.accuracy =
            {
                name: 'Perfect Shot!!!',
                float: accuracyAmount,
                multiplier: 10,
            }
            // Less than 3 px
        } else if (accuracyAmount < 3) {
            entities.cannonBall.accuracy =
            {
                name: 'Great Shot!!',
                float: accuracyAmount,
                multiplier: 5,
            }
            // Less than 5 px
        } else if (accuracyAmount < 5) {
            entities.cannonBall.accuracy =
            {
                name: 'Good Shot!',
                float: accuracyAmount,
                multiplier: 3,
            }
            // Less than 10px
        } else if (accuracyAmount < 10) {
            entities.cannonBall.accuracy =
            {
                name: 'Decent Shot',
                float: accuracyAmount,
                multiplier: 2,
            }
            // Greater than 10px
        } else if (accuracyAmount > 10) {
            entities.cannonBall.accuracy =
            {
                name: 'Hit',
                float: accuracyAmount,
                multiplier: 1,
            }
        }
    }

    function endGameHandler() {
        // stop the background noise
        entities.gameData.setPlayBgMusic(false)
        // TNT handle click
        if (!entities.gameData.isGameOver) {
            if (entities.gameData.isSoundEffectsOn > 0) {
                try {
                    entities.sounds.tntHandleClickSound.replayAsync()
                } catch (error) {
                    console.log('error in TNT handle click ', error)
                }
            }
            // calculate accuracy to center of ball being over the center or box
            calculateAccuracy();
            // pass data to end game modal
            setEndGameModalStats();
        };

        //trigger the boolean to let the air-time counter stop and game aspects
        //this is different than the useState is gameover that sets the modal
        entities.gameData.isGameOver = true;
        entities.cannonBall.velocity[1] = 0
        entities.cannonBall.velocity[0] = 0
        // Lower TNT handle
        const bottomOfCannonBall = entities.cannonBall.position[1] + (+entities.cannonBall.cannonBallRadius * 2)
        const cannonBallTopTNTDistance = bottomOfCannonBall - +entities.TNT.position[1]
        // subtract from 9 because -10px is bottoming out on TNT. Used 9 for a little bit of overlap
        console.log('bottom of cannon ball ', bottomOfCannonBall)
        console.log('top of TNT ', entities.TNT.position[1])
        console.log('cannonBallTopTNTDisatance ', cannonBallTopTNTDistance)
        console.log('tnt handle position ', Math.floor(cannonBallTopTNTDistance) - 9)

        entities.TNT.handlePosition[0] = -12;

        // // pause the cannonBall
        setTimeout(() => {
            // set the ball explosion coordinates
            entities.explosion.ballPosition[0] = entities.cannonBall.position[0] + 5;
            entities.explosion.ballPosition[1] = entities.cannonBall.position[1] + 5;
            // set the firework explosion coordinate
            entities.explosion.position[0] = entities.TNT.position[0] + 15
            entities.explosion.position[1] = entities.TNT.position[1] + 15
            // Play Explosion Sound only once. Using startAnimation as a trigger
            if (!entities.explosion.startAnimation && entities.gameData.isSoundEffectsOn > 0) {
                try {
                    entities.sounds.tntExplosionSound.replayAsync();
                } catch (error) {
                    console.log('error with explosion sound ', error)
                }
            }
            // trigger explosion animation
            entities.explosion.startAnimation = true;
            // make tnt box and cannonBall disappear with a slight delay
            setTimeout(() => {
                entities.TNT.display = 'none';
                entities.cannonBall.display = 'none'
            }, 200);
        }, 1000)
        setTimeout(() => {
            entities.gameData.setIsGameOver(true)
        }, 3500);
    }

    function setEndGameModalStats() {
        // pass all the relevant data to end game modal
        entities.gameData.endGameData.current.accuracyFloat = entities.cannonBall.accuracy.float;
        entities.gameData.endGameData.current.accuracyName = entities.cannonBall.accuracy.name;
        entities.gameData.endGameData.current.multiplier = entities.cannonBall.accuracy.multiplier
        entities.gameData.endGameData.current.airTime = entities.headerStats.airTime;
        // If no bounces, return zero, else return the number of bounces times 500 (500 points per bounce)
        entities.gameData.endGameData.current.bounces = entities.headerStats.bounces === 0 ? 0 : entities.headerStats.bounces * 500;
    }

    // LEFT LINE OF TNT BOX
    // Corner Coordinate
    const leftLineX1 = entities.TNT.position[0];
    const leftLineY1 = entities.TNT.position[1];

    // TOP LINE OF TNT BOX (The Handle) This
    const handleBarX1 = entities.TNT.position[0] + 10;
    const handleBarY1 = entities.TNT.position[1] - 6;

    // CIRCLE PROPERTIES
    const radius = +entities.cannonBall.cannonBallRadius
    const circleX = entities.cannonBall.position[0] + radius;
    const circleY = entities.cannonBall.position[1] + radius;

    const prevCircleX = entities.cannonBall.prevPosition[0] + radius;
    const prevCircleY = entities.cannonBall.prevPosition[1] + radius;


    // 1) check if ball is in rectangle //
    // 2) check is hind line is within the ball
    const isInsideBox = isCircleInRectangle(circleX, circleY, radius, leftLineX1, leftLineY1, 30, 30) // last two parameters are width and height of TNT
    const lastFrame = isCircleInRectangle(prevCircleX, prevCircleY, radius, leftLineX1, leftLineY1, 30, 30) // last two parameters are width and height of TNT
    const entrySide = determineEntrySide();

    function determineEntrySide() {
        // Only if previous position was outisde the X and current is inside the X
        if (
            // Check to see if the previous position was outside and the current is inside the rect
            ((prevCircleX + radius) <= leftLineX1) &&
            ((circleX + radius) > leftLineX1) 

        ) {
            entities.cannonBall.lastDirection = 'left';
            return 'left';
        }
        else if (
            // Check to see if the previous position was outside and the current is inside the rect
            (prevCircleX - radius) >= leftLineX1 + 30 &&
            (circleX - radius) < leftLineX1 + 30 
        ) {
            entities.cannonBall.lastDirection = 'right'
            return 'right';
        }
        else if (
            // Check to see if the previous position was outside and the current is inside the rect
            (prevCircleY + radius) <= leftLineY1 &&
            (circleY + radius) > leftLineY1
        ) {
            entities.cannonBall.lastDirection = 'top';
            return 'top'
        }
        else if (
            // Check to see if the previous position was outside and the current is inside the rect
            ((prevCircleY - radius) >= leftLineY1 &&
                (circleY - radius) > leftLineY1) 
        ) {
            entities.cannonBall.lastDirection = 'bottom'
            return 'bottom';
        }
        else {
            return 'inside'; // Circle is already inside
        }
    }

    // Determine direction of cannonBall
    if (isInsideBox && !lastFrame) {
        if (entrySide === 'left') {
            cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0);
        }
        else if (entrySide === 'right') {
            cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 0);
        }
        else if (entrySide === 'top') {
            cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);
        }
        // // CannonBall is coming from the bottom
        else if (entrySide === 'bottom') {
            cannonBallBounce(entities.gameData, entities.gameData.isSoundEffectsOn, entities.sounds, 'tntCannonBallHitSound', entities.headerStats, entities.cannonBall, 1);
        }
    }

    // CHECKING FOR HANLDE COLLISION USING A SEPARATE FUNCTION
    // TO HANDLE TELEPORTATION WHEN MOVING AT HIGH VELOCITY 
    if (isCircleInRectangle(circleX, circleY, radius, handleBarX1, handleBarY1, 10, 6)) {
        if (entities.cannonBall.velocity[1] > 0) {
            endGameHandler();
        }
    }

    return entities;
}

export default TNTDetectionSystem;