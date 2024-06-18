const marksNineSpeed = 2.5;

const moveTNTMarksLevelNine = (entities, { time }) => {

    const moveDiagonalDownLeft = () => {
        entities.TNT.position[0] -= marksNineSpeed;
        entities.TNT.position[1] += marksNineSpeed;
        entities.tntMovementCount.tntPixelCounter += marksNineSpeed;
    }
    const moveDiagonalUpLeft = () => {
        entities.TNT.position[0] -= marksNineSpeed;
        entities.TNT.position[1] -= marksNineSpeed;
        entities.tntMovementCount.tntPixelCounter += marksNineSpeed;
    }
    const moveDiagonalDownRight = () => {
        entities.TNT.position[0] += marksNineSpeed;
        entities.TNT.position[1] += marksNineSpeed;
        entities.tntMovementCount.tntPixelCounter += marksNineSpeed;
    }
    const moveDiagonalUpRight = () => {
        entities.TNT.position[0] += marksNineSpeed;
        entities.TNT.position[1] -= marksNineSpeed
        entities.tntMovementCount.tntPixelCounter += marksNineSpeed;
    }

    if (!entities.gameData.isGameOver) {
        const { tntPixelCounter } = entities.tntMovementCount;
        let timePassed;

        // Time delta is zero only on the first iteration
        if (time.delta === 0) {
            entities.timeStampLastPaused = Math.floor(time.current);
            timePassed = 0;
        } else {
            timePassed = time.current - Math.floor(entities.timeStampLastPaused)
        }

        // console.log('time passed ', timePassed)
        console.log('tntPixels ', tntPixelCounter)
        // PAUSE
        if (timePassed < 50) {
            return entities;
        }

        
        //////////// FORWARD ///////////////
        // Move Diagonal Down
        if (tntPixelCounter <= 200) {
            if (tntPixelCounter === 200) entities.timeStampLastPaused = Math.floor(time.current);
            moveDiagonalDownLeft();
        }
        // Move Diagonal Up
        else if (tntPixelCounter >= 200 && tntPixelCounter <= 400) {
            if (tntPixelCounter === 400) entities.timeStampLastPaused = Math.floor(time.current);
            moveDiagonalUpLeft();
        }
        // Move Diagonal Down Right
        else if (tntPixelCounter >= 400 && tntPixelCounter <= 600) {
            if (tntPixelCounter === 600) entities.timeStampLastPaused = Math.floor(time.current);
            moveDiagonalDownLeft();
        }
        // Move Diagonal Up Left
        else if (tntPixelCounter >= 600 && tntPixelCounter <= 800) {
            if (tntPixelCounter === 800) entities.timeStampLastPaused = Math.floor(time.current);
            moveDiagonalUpLeft();
        }

        //////////// REVERSE ///////////////
        // Move Diagonal Down Right
        else if (tntPixelCounter >= 800 && tntPixelCounter <= 1000) {
            if (tntPixelCounter === 1000) entities.timeStampLastPaused = Math.floor(time.current);
            moveDiagonalDownRight();
        }
        // Move Diagonal Up Right
        else if (tntPixelCounter >= 1000 && tntPixelCounter <= 1200) {
            if (tntPixelCounter === 1200) entities.timeStampLastPaused = Math.floor(time.current);
            moveDiagonalUpRight();
        }
        // Move Diagonal Down Right
        else if (tntPixelCounter >= 1200 && tntPixelCounter <= 1400) {
            if (tntPixelCounter === 1400) entities.timeStampLastPaused = Math.floor(time.current);
            moveDiagonalDownRight();
        }
        // Move Diagonal Up Right
        else if (tntPixelCounter >= 1400 && tntPixelCounter <= 1600) {
            if (tntPixelCounter === 1600) entities.timeStampLastPaused = Math.floor(time.current);
            moveDiagonalUpRight();
        }

        // Reset counter after completing a cycle
        else if (tntPixelCounter >= 1600) {
            entities.timeStampLastPaused = Math.floor(time.current);
            entities.tntMovementCount.tntPixelCounter = 0;
        }
    }
    return entities;
}

export default moveTNTMarksLevelNine;