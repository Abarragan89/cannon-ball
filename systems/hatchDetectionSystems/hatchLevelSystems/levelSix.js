import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const levelSixHatchSystem = (entities) => {
    if (!entities.gameData.isGameOver) {

        const TNTBoundaryLeft = 10;
        const TNTBoundaryRight = 40
        // Move Cannon
        moveObstacleLeftToRight(entities.cannon, 43, 97, .5);
        moveObstacleLeftToRight(entities.cannonStand, 40, 100, .5);
        // Move TNT Movement 
        moveObstacleLeftToRight(entities.TNT, TNTBoundaryLeft, TNTBoundaryRight, 1)
        // WIDTH OF THE HATCH WALLS IS 15
        moveObstacleLeftToRight(entities.hatchSideOne, TNTBoundaryLeft - 15, TNTBoundaryRight + 15, 1)
        moveObstacleLeftToRight(entities.hatchSideTwo, TNTBoundaryLeft + 30, TNTBoundaryRight - 30, 1)
        moveObstacleLeftToRight(entities.hatchLid, TNTBoundaryLeft - 5, TNTBoundaryRight + 5, 1)

    }
    return entities;
}

export default levelSixHatchSystem;