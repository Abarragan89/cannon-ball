import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// ** The TNT starts at (250, 50)

const moveTNTMarksLevelFive = (entities) => {
    if (!entities.cannonBall.isGameOver){
        const speed = 0.5;

        // move down
        if (entities.TNT.position[1] < 250 && entities.TNT.position) {
            console.log('moving down');
            entities.TNT.position[1] += speed;
        // move left
        } else if (entities.TNT.position[0]) {
            console.log('moving left');
            entities.TNT.position[0] -= speed;
        // move up
        } else if (entities.TNT.position[1] > 50) {
            console.log('moving up');
            entities.TNT.position[1] -= speed;
        // move right
        } else if (entities.TNT.position[0] < screenWidth - 50) {
            console.log('moving right');
            entities.TNT.position[0] += speed;
        }

    }
    return entities;
}

export default moveTNTMarksLevelFive;