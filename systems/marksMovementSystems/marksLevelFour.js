import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

let angle = 0;
const radius = 175 

const moveTNTMarksLevelFour = (entities) => {

    if (!entities.gameData.isGameOver) {
        const centerX = screenWidth / 2 + 170;
        const centerY = screenHeight / 2 - 20;
    
        // Update the angle based on time or any other factor
        angle += 0.01;
        // Calculate new TNT position using polar coordinates
        const tntX = centerX + radius * Math.cos(angle);
        const tntY = centerY + radius * Math.sin(angle);
    
        entities.TNT.position[0] = tntX;
        entities.TNT.position[1] = tntY;
    }
    return entities;
}

export default moveTNTMarksLevelFour;