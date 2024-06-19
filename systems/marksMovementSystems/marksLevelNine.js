const marksNineSpeed = 2.5;
const possiblePauseTimes = [
    500,
    1000,
    1500,
    2000,
    2000,
    2000,
    3000,
    3000,
    4000,
    4000,
    5000,
    5000,
    6000,
]

const moveTNTMarksLevelNine = (entities, { time }) => {

    const moveDiagonalDownLeft = () => {
        entities.TNT.position[0] -= marksNineSpeed;
        entities.TNT.position[1] += marksNineSpeed;
        entities.tntPixelCounter += marksNineSpeed;
    }
    const moveDiagonalUpLeft = () => {
        entities.TNT.position[0] -= marksNineSpeed;
        entities.TNT.position[1] -= marksNineSpeed;
        entities.tntPixelCounter += marksNineSpeed;
    }
    const moveDiagonalDownRight = () => {
        entities.TNT.position[0] += marksNineSpeed;
        entities.TNT.position[1] += marksNineSpeed;
        entities.tntPixelCounter += marksNineSpeed;
    }
    const moveDiagonalUpRight = () => {
        entities.TNT.position[0] += marksNineSpeed;
        entities.TNT.position[1] -= marksNineSpeed
        entities.tntPixelCounter += marksNineSpeed;
    }

    const resetDelayAndTimeStamp = () => {
        entities.timeStampLastPaused = Math.floor(time.current)
        entities.randomDelayTime = possiblePauseTimes[Math.floor(Math.random() * possiblePauseTimes.length)]
    }

    if (!entities.gameData.isGameOver) {
        const { tntPixelCounter, randomDelayTime } = entities;
        let timePassed;

        // Time delta is zero only on the first iteration
        if (time.delta === 0) {
            entities.timeStampLastPaused = Math.floor(time.current);
            timePassed = 0;
        } else {
            // Determine how long it has been since last timeStamp
            timePassed = time.current - Math.floor(entities.timeStampLastPaused)
        }

        // PAUSE if timelapse hasn't been met yet
        if (timePassed < randomDelayTime) {
            return entities;
        }

        //////////// FORWARD ///////////////
        // Move Diagonal Down
        if (tntPixelCounter <= 200) {
            moveDiagonalDownLeft();
            if (tntPixelCounter === 200) resetDelayAndTimeStamp();
        }
        // Move Diagonal Up
        else if (tntPixelCounter >= 200 && tntPixelCounter <= 400) {
            moveDiagonalUpLeft();
            if (tntPixelCounter === 400) resetDelayAndTimeStamp();
        }
        // Move Diagonal Down Right
        else if (tntPixelCounter >= 400 && tntPixelCounter <= 600) {
            moveDiagonalDownLeft();
            if (tntPixelCounter === 600) resetDelayAndTimeStamp();
        }
        // Move Diagonal Up Left
        else if (tntPixelCounter >= 600 && tntPixelCounter <= 800) {
            if (tntPixelCounter === 800) resetDelayAndTimeStamp();
            moveDiagonalUpLeft();
        }

        //////////// REVERSE ///////////////
        // Move Diagonal Down Right
        else if (tntPixelCounter >= 800 && tntPixelCounter <= 1000) {
            if (tntPixelCounter === 1000) resetDelayAndTimeStamp();
            moveDiagonalDownRight();
        }
        // Move Diagonal Up Right
        else if (tntPixelCounter >= 1000 && tntPixelCounter <= 1200) {
            if (tntPixelCounter === 1200) resetDelayAndTimeStamp();
            moveDiagonalUpRight();
        }
        // Move Diagonal Down Right
        else if (tntPixelCounter >= 1200 && tntPixelCounter <= 1400) {
            if (tntPixelCounter === 1400) resetDelayAndTimeStamp();
            moveDiagonalDownRight();
        }
        // Move Diagonal Up Right
        else if (tntPixelCounter >= 1400 && tntPixelCounter <= 1600) {
            if (tntPixelCounter === 1600) resetDelayAndTimeStamp();
            moveDiagonalUpRight();
        }

        // Reset counter after completing a cycle
        else if (tntPixelCounter >= 1600) {
            entities.timeStampLastPaused = Math.floor(time.current);
            entities.tntPixelCounter = 2.5;
        }
    }
    return entities;
}

export default moveTNTMarksLevelNine;