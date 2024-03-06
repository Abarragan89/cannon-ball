import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

let velocityX = 0.8;
let velocityY = 0.8;
const moveTNTMarksLevelThree = (entities) => {

    if (!entities.cannonBall.isGameOver) {
        entities.TNT.position[0] += velocityX;
        entities.TNT.position[1] += velocityY;
        // if Bottom is hit
        if (entities.TNT.position[1] > screenHeight - 130) {
            velocityY = -velocityY
        }
        // if Top is hit
        if (entities.TNT.position[1] <= 0) {
            velocityY = -velocityY
        }

        // if Left is hit
        if (entities.TNT.position[0] <= 0) {
            velocityX  = -velocityX 
        }

        // if Right is hit
        if (entities.TNT.position[0] > screenWidth - 30){
            velocityX  = -velocityX
        }
    }
    return entities;
}

export default moveTNTMarksLevelThree;