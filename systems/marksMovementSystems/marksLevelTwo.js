import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

let direction = 'left'
const moveTNTMarksLevelTwo = (entities) => {
    let speed = 1
    if (!entities.gameData.isGameOver) {
        if (entities.TNT.position[0] > screenWidth - 30) {
            direction = 'left';
        } 
        if (entities.TNT.position[0] < 30) {
            direction = 'right';
        }
        if (direction === 'right') {
            entities.TNT.position[0] += speed;
        } else if (direction === 'left') {
            entities.TNT.position[0] -= speed;
        }
    }
    return entities;
}

export default moveTNTMarksLevelTwo;