import lineBallDetection from "../utils/lineBallDetection";

const TNTDetectionSystem = (entities) => {
    /////////////////// HELPER FUNCTIONS TO END GAME //////////////
    function calculateAccuracy() {
        // coordinates for the bottom of the ball
        const ballXCoord = entities.cannonBall.position[0] + 10;
        const ballYCoord = entities.cannonBall.position[1] + 20;

        // coordinate for the top center of the TNT
        const tntXCoord = entities.TNT.position[0] + 15;
        const tntYCoord = entities.TNT.position[1] - 2;

        // calculate the length of both sides
        const triangleASide = Math.abs(ballXCoord - tntXCoord);
        const triangeBSide = Math.abs(ballYCoord - tntYCoord);

        const accuracyAmount = (Math.sqrt(triangleASide ** 2 + triangeBSide ** 2)).toFixed(2);
        if (accuracyAmount > 10) {
            entities.cannonBall.accuracy =
            {
                name: 'Hit',
                float: accuracyAmount,
                multiplier: 1,
            }
        } else if (accuracyAmount >= 10) {
            entities.cannonBall.accuracy =
            {
                name: 'Good Shot',
                float: accuracyAmount,
                multiplier: 2,
            }
        } else if (accuracyAmount >= 3) {
            entities.cannonBall.accuracy =
            {
                name: 'Great Shot!',
                float: accuracyAmount,
                multiplier: 3,
            }
        } else if (accuracyAmount < 3) {
            entities.cannonBall.accuracy =
            {
                name: 'Perfect Shot!!!',
                float: accuracyAmount,
                multiplier: 5,
            }
        }
    }

    function endGameHandler() {
        // stop the background noise
        entities.gameData.setPlayBgMusic(false)
        // TNT handle click
        if (!entities.gameData.isGameOver) {
            try {
                entities.sounds.tntHandleClickSound.replayAsync()
            } catch (error) {
                console.log('error in TNT handle click ', error)
            }
            // calculate accuracy to center of ball being over the center or box
            calculateAccuracy();
            // pass data to end game modal
            setEndGameModalStats();
        };

        //trigger the boolean to let the air-time counter stop and game aspects
        //this is different than the useState is gameover that sets the modal
        entities.gameData.isGameOver = true;
        // Lower TNT handle
        entities.TNT.handlePosition[0] = -14;
        // // pause the cannonBall
        entities.cannonBall.velocity[1] = 0
        entities.cannonBall.velocity[0] = 0
        setTimeout(() => {
            // set the ball explosion coordinates
            entities.explosion.ballPosition[0] = entities.cannonBall.position[0] + 5;
            entities.explosion.ballPosition[1] = entities.cannonBall.position[1] + 5;
            // set the firework explosion coordinate
            entities.explosion.position[0] = entities.TNT.position[0] + 15
            entities.explosion.position[1] = entities.TNT.position[1] + 15
            // Play Explosion Sound only once. Using startAnimation as a trigger
            if (!entities.explosion.startAnimation) entities.sounds.tntExplosionSound.replayAsync();
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
    const leftLineX1 = entities.TNT.position[0];
    const leftLineY1 = entities.TNT.position[1] + 2;
    const leftLineX2 = entities.TNT.position[0];
    const leftLineY2 = entities.TNT.position[1] + 30;

    // RIGHT LINE OF TNT BOX
    const rightLineX1 = entities.TNT.position[0] + 30;
    const rightLineY1 = entities.TNT.position[1] + 2;
    const rightLineX2 = entities.TNT.position[0] + 30;
    const rightLineY2 = entities.TNT.position[1] + 30;

    // BOTTOM LINE OF TNT BOX
    const bottomLineX1 = entities.TNT.position[0] + 3;
    const bottomLineY1 = entities.TNT.position[1] + 30;
    const bottomLineX2 = entities.TNT.position[0] + 27;
    const bottomLineY2 = entities.TNT.position[1] + 30;

    // TOP LINE OF TNT BOX (The Handle)
    const topLineX1 = entities.TNT.position[0] + 10;
    const topLineY1 = entities.TNT.position[1] - 5;
    const topLineX2 = entities.TNT.position[0] + 20;
    const topLineY2 = entities.TNT.position[1] - 5;

    // CIRCLE PROPERTIES
    const radius = 10;
    const circleX = entities.cannonBall.position[0] + 10;
    const circleY = entities.cannonBall.position[1] + 10;

    ///////////// CHECKING FOR LEFT WALL DETECTION ////////////////////////
    if (lineBallDetection(leftLineX1, leftLineY1, leftLineX2, leftLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[0] > 0) {
            try {
                entities.sounds.tntCannonBallHitSound.replayAsync();
            } catch (error) {
                console.log('error in TNT HIT SOUND ', error)
            }
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
        }
    }

    ////////////////// CHECKING FOR RIGHT WALL DETECTION //////////////////
    if (lineBallDetection(rightLineX1, rightLineY1, rightLineX2, rightLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[0] < 0) {
            try {
                entities.sounds.tntCannonBallHitSound.replayAsync();
            } catch (error) {
                console.log('error in TNT HIT SOUND ', error)
            }
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
        }
    }

    ////////////////// CHECKING FOR BOTTOM WALL DETECTION /////////////////
    if (lineBallDetection(bottomLineX1, bottomLineY1, bottomLineX2, bottomLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] < 0) {
            try {
                entities.sounds.tntCannonBallHitSound.replayAsync();
            } catch (error) {
                console.log('error in TNT HIT SOUND ', error)
            }
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[1] = -entities.cannonBall.velocity[1]
        }
    }

    ////////////////// CHECKING FOR TOP WALL DETECTION /////////////////
    if (lineBallDetection(topLineX1, topLineY1, topLineX2, topLineY2, circleX, circleY, radius)) {
        endGameHandler();
    }

    return entities;
}

export default TNTDetectionSystem;