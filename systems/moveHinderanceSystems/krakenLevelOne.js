import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

let angle = 0;
const radius = 100// Adjust the radius as needed

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
    return entities;
}

export default krakenLevelOne;