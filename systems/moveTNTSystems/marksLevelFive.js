import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

let counter = 0;
const moveTNTMarksLevelFive = (entities) => {
    if (!entities.cannonBall.isGameOver){
        const speed = 1;

        // moving right
        if (counter <= 300) {
            entities.TNT.position[0] += speed;
            counter++;
        // moving down
        } else if (counter > 300 && counter <=450) {
            entities.TNT.position[1] += speed;
            counter++
        // moving left
        } else if (counter > 450 && counter <= 750) {
            entities.TNT.position[0] -= speed;
            counter++;
        // moving up
        } else if (counter > 750 && counter <=900) {
            entities.TNT.position[1] -= speed;
            counter++;
        } else if (counter > 900) {
            counter = 0;
        }
    }
    return entities;
}

export default moveTNTMarksLevelFive;