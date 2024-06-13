import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width

const moveTNTMarksLevelEight = (entities, { touches }) => {
    // Touch event to move TNT when user moves cannon angle
    touches.forEach(t => {
        if (t.type === "move") {
            const deltaX = t.delta.pageX;
            const angleSensitivity = 0.2;
            const angleChange = -deltaX * angleSensitivity;
            const currentTNTPositionX = entities.TNT.position[0];

            console.log('In level 8', deltaX);
            // restrict ball TNT from going off screen to the right
            if (currentTNTPositionX > 5 && deltaX > 0) {
                entities.TNT.position[0] += angleChange;
                // restrict TNT from TNT from going off screen to the left
            } else if (currentTNTPositionX < screenWidth - 35 && deltaX < 0) {
                entities.TNT.position[0] += angleChange;
            }
        }
    })
    // Move TNT left to right when ball is moving
    if (entities.cannonBall.isBallMoving && !entities.gameData.isGameOver) {
        if (entities.TNT.position[0] > screenWidth - 30) {
            direction = 'left';
        } 
        if (entities.TNT.position[0] < 30) {
            direction = 'right';
        }
        if (direction === 'right') {
            entities.TNT.position[0] += 1;
        } else if (direction === 'left') {
            entities.TNT.position[0] -= 1;
        }
    }
    return entities;
}

export default moveTNTMarksLevelEight; 