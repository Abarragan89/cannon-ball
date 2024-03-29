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

        if (accuracyAmount >= 15) {
            entities.cannonBall.accuracy =
            {
                name: 'Good Shot',
                float: accuracyAmount,
                multiplier: 2,

            }
        } else if (accuracyAmount >= 5) {
            entities.cannonBall.accuracy =
            {
                name: 'Great Shot!',
                float: accuracyAmount,
                multiplier: 3,
            }
        } else {
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
        if (!entities.gameData.isGameOver) entities.sounds.tntHandleClickSound.replayAsync();
        //trigger the boolean to let the air-time counter stop and game aspects
        //this is different than the useState is gameover that sets the modal
        entities.gameData.isGameOver = true;
        // calculate accuracy to center of box
        calculateAccuracy();
        // pass data to end game modal
        setEndGameModalStats();
        // Lower TNT handle
        entities.TNT.handlePosition[0] = -6;
        // pause the cannonBall
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
        entities.gameData.endGameData.current.bounces = entities.headerStats.bounces + 1;
    }

    // Left LINE OF TNT BOX
    const leftLineX1 = entities.TNT.position[0];
    const leftLineY1 = entities.TNT.position[1] - 3;
    const leftLineX2 = entities.TNT.position[0];
    const leftLineY2 = entities.TNT.position[1] + 30;

    // Right LINE OF TNT BOX
    const rightLineX1 = entities.TNT.position[0] + 33;
    const rightLineY1 = entities.TNT.position[1] - 3;
    const rightLineX2 = entities.TNT.position[0] + 33;
    const rightLineY2 = entities.TNT.position[1] + 27;

    // BOTTOM LINE OF TNT BOX
    const bottomLineX1 = entities.TNT.position[0] + 3;
    const bottomLineY1 = entities.TNT.position[1] + 33;
    const bottomLineX2 = entities.TNT.position[0] + 27;
    const bottomLineY2 = entities.TNT.position[1] + 33;

    // TOP LINE OF TNT BOX
    const topLineX1 = entities.TNT.position[0] + 3;
    const topLineY1 = entities.TNT.position[1] + 5;
    const topLineX2 = entities.TNT.position[0] + 27;
    const topLineY2 = entities.TNT.position[1] + 2;

    // CIRCLE PROPERTIES
    const radius = 10;
    const circleX = entities.cannonBall.position[0] + 10;
    const circleY = entities.cannonBall.position[1] + 10;

    ///////////// CHECKING FOR LEFT WALL DETECTION ////////////////////////
    if (lineBallDetection(leftLineX1, leftLineY1, leftLineX2, leftLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[0] > 0) {
            entities.sounds.tntCannonBallHitSound.replayAsync();
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
        }
    }

    ////////////////// CHECKING FOR RIGHT WALL DETECTION //////////////////
    if (lineBallDetection(rightLineX1, rightLineY1, rightLineX2, rightLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[0] < 0) {
            entities.sounds.tntCannonBallHitSound.replayAsync();
            entities.headerStats.bounces += 1;
            entities.cannonBall.velocity[0] = -entities.cannonBall.velocity[0]
        }
    }

    ////////////////// CHECKING FOR BOTTOM WALL DETECTION /////////////////
    if (lineBallDetection(bottomLineX1, bottomLineY1, bottomLineX2, bottomLineY2, circleX, circleY, radius)) {
        if (entities.cannonBall.velocity[1] < 0) {
            entities.sounds.tntCannonBallHitSound.replayAsync();
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