const a = 300; // Horizontal radius
const b = 80; // Vertical radius
const speed = 0.02; // Speed of movement
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

const moveTNTMarksLevelTen = (entities, { time }) => {
    const { tntMovementCount, TNT, gameData, randomDelayTime } = entities;

    const moveTNTOvally = () => {
        // Increment the angle for the parametric equations
        tntMovementCount.angle += speed;

        // Calculate the new position using the parametric equations of an ellipse
        TNT.position[0] = TNT.initialPosition[0] + a * Math.cos(tntMovementCount.angle);
        TNT.position[1] = TNT.initialPosition[1] + b * Math.sin(tntMovementCount.angle);

        // Keep the angle within the range [0, 2 * Math.PI]
        if (tntMovementCount.angle >= 2 * Math.PI) {
            tntMovementCount.angle -= 2 * Math.PI;
        }
        tntMovementCount.tntPixelCounter++
    }

    if (!gameData.isGameOver) {
        if (tntMovementCount.tntPixelCounter > 200) {
            tntMovementCount.timeStampLastPaused = Math.floor(time.current)
            entities.randomDelayTime = possiblePauseTimes[Math.floor(Math.random() * possiblePauseTimes.length)]
            tntMovementCount.tntPixelCounter = 0;
            return entities
        }
        // compare time stamp since last stop to current time
        const timeElapsed = Math.floor(time.current - tntMovementCount.timeStampLastPaused)

        // only run if passed time delay or if it is in it's first iteration and Time Stamp is Zero
        if (timeElapsed > randomDelayTime || tntMovementCount.timeStampLastPaused === 0) {
            moveTNTOvally();
        }
    }

    return entities;
};

export default moveTNTMarksLevelTen;