import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width

let direction = 'left';
const moveTNTMarksLevelEight = (entities, { touches }) => {
    // Touch event to move TNT when user moves cannon angle
    touches.forEach(t => {
        if (t.type === "move") {
            const deltaX = t.delta.pageX;
            const angleSensitivity = 0.2;
            const angleChange = -deltaX * angleSensitivity;
            const currentTNTPositionX = entities.TNT.position[0];

            // restrict ball TNT from going off screen to the right
            // only move ball with angle if ball is not moving
            if (
                currentTNTPositionX > 5 &&
                deltaX > 0 &&
                !entities.cannonBall.isBallMoving
            ) {
                entities.TNT.position[0] += angleChange;
            }
            // restrict TNT from TNT from going off screen to the left
            else if (
                currentTNTPositionX < screenWidth - 35 &&
                deltaX < 0 &&
                !entities.cannonBall.isBallMoving

            ) {
                entities.TNT.position[0] += angleChange;
            }
        }
    });

    // Move TNT left to right when ball is moving
    if (entities.cannonBall.isBallMoving && !entities.gameData.isGameOver) {
        const currentTNTPositionX = entities.TNT.position[0];
        if (direction === 'right') {
            entities.TNT.position[0] += 1;
            if (currentTNTPositionX > screenWidth - 35) direction = 'left';
        } else if (direction === 'left') {
            entities.TNT.position[0] -= 1;
            if (currentTNTPositionX < 5) direction = 'right'
        }
    }
    return entities;
}

export default moveTNTMarksLevelEight; 