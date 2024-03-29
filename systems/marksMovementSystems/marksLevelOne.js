import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;

let direction = 'up'
const moveTNTMarksLevelOne = (entities) => {
    if (!entities.gameData.isGameOver) {
        if (entities.TNT.position[1] > screenHeight - 130) {
            direction = 'up';
        } 
        if (entities.TNT.position[1] < 30) {
            direction = 'down';
        }
        if (direction === 'down') {
            entities.TNT.position[1] += 0.5;
        } else if (direction === 'up') {
            entities.TNT.position[1] -= 0.5;
        }
    }
    return entities;
}

export default moveTNTMarksLevelOne;