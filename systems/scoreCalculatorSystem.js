function scoreCalculatorSystem(entities) {
    // While ball is moving and game is not over
    if (entities.cannonBall.isBallMoving && !entities.cannonBall.isGameOver) {
        entities.headerStats.airTime += 1
        // else if the game is not over and ball is not moving
        // if game is over, we don't want to reset the points, 
        // we want to keep the points to save. 
    } else if (!entities.cannonBall.isGameOver && !entities.cannonBall.isBallMoving) {
        entities.headerStats.airTime = 0
        entities.headerStats.bounces = 0
    }
    return entities;
}

export default scoreCalculatorSystem;