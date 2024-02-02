import { isBallMoving } from "./fireCannonSystem";
import { isGameOver } from "./explodeTNTSystem";


function scoreCalculatorSystem(entities) {
    // While ball is moving and game is not over
    if (isBallMoving && !isGameOver) {
        entities.headerStats.airTime += 1
        // else if the game is not over and ball is not moving
        // if game is over, we don't want to reset the points, 
        // we want to keep the points to save. 
    } else if (!isGameOver && !isBallMoving) {
        entities.headerStats.airTime = 0
        entities.headerStats.bounces = 0
    }
    // console.log(entities.headerStats.airTime);
    // console.log(entities.headerStats.bounces)
    return entities;
}

export default scoreCalculatorSystem;