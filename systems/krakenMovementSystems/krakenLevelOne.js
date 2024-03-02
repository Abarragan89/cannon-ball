import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

let angle = 0;
const radius = 100// Adjust the radius as needed
let TNTDirection = 'up';
let TNTMovementCounter = 0;

const krakenLevelOne = (entities) => {

    if (!entities.cannonBall.isGameOver) {
        const centerX = screenWidth / 2 + 170;
        const centerY = screenHeight / 2 - 20;

        // Update the angle based on time or any other factor
        angle += 0.04;

        // Calculate new TNT position using polar coordinates
        const hinderanceX = centerX + radius * Math.cos(angle);
        const hinderanceY = centerY + radius * Math.sin(angle);

        entities.squareHindOne.position[0] = hinderanceX;
        entities.squareHindOne.position[1] = hinderanceY;

    }


    // Move TNT 
    if (TNTMovementCounter >= 200) {
        TNTDirection = 'up';
    }
    if (TNTMovementCounter <= -200) {
        TNTDirection = 'down';
    }
    if (TNTDirection === 'down') {
        entities.TNT.position[1] += .2;
        TNTMovementCounter += 1
    } else if (TNTDirection === 'up') {
        entities.TNT.position[1] -= .2;
        TNTMovementCounter -= 1
    }
    return entities;
}

export default krakenLevelOne;