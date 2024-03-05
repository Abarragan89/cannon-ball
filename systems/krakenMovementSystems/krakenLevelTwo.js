import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
import moveObstacleLeftToRight from "../../utils/moveObstacles/moveObstacleLeftToRight";

let squareOneDirection = 'left';
let squareTwoDirection = 'right';
let squareThreeDirection = 'left';
let tntDirection = 'left'

const krakenLevelTwo = (entities) => {
    if (!entities.cannonBall.isGameOver) {
        moveObstacleLeftToRight(entities.squareHindOne, 0, Math.floor(screenWidth) / 2 + 40, 2)
        moveObstacleLeftToRight(entities.squareHindTwo, 0, Math.floor(screenWidth) / 2 + 40, 2)
        moveObstacleLeftToRight(entities.squareHindThree, 0, Math.floor(screenWidth) / 2 + 40, 2)
        moveObstacleLeftToRight(entities.TNT, 0, Math.floor(screenWidth) / 2 + 30, 2)
    }
    return entities;
}

export default krakenLevelTwo;