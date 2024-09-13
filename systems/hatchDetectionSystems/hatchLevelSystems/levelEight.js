import moveObstacleLeftToRight from "../../../utils/moveObstacles/moveObstacleLeftToRight";

const levelEightHatchSystem = (entities) => {
    if (!entities.gameData.isGameOver) {

        const TNTBoundaryLeft = 15;
        const TNTBoundaryRight = 295

        moveObstacleLeftToRight(entities.hatchBtnOne, TNTBoundaryLeft - 15, TNTBoundaryRight - 10, .5)
        moveObstacleLeftToRight(entities.hatchBtnTwo, TNTBoundaryLeft - 15, TNTBoundaryRight - 10, .3)

        // Move TNT Movement 
        moveObstacleLeftToRight(entities.TNT, TNTBoundaryLeft, TNTBoundaryRight, .7)
        // WIDTH OF THE HATCH WALLS IS 15
        moveObstacleLeftToRight(entities.hatchSideOne, TNTBoundaryLeft - 15, TNTBoundaryRight + 15, .7)
        moveObstacleLeftToRight(entities.hatchSideTwo, TNTBoundaryLeft + 30, TNTBoundaryRight - 30, .7)
        moveObstacleLeftToRight(entities.hatchLid, TNTBoundaryLeft - 5, TNTBoundaryRight + 5, .7)
    }
    return entities;
}

export default levelEightHatchSystem;