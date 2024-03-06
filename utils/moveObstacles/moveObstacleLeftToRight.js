import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

function moveObstacleLeftToRight(entity, maxLeft, maxRight, speed) {
    const distanceFromLeft = entity.position[0];
    const distanceFromRight = screenWidth - entity.position[0];

    // Check if the obstacle should change direction
    if (distanceFromLeft <= maxLeft) {
        entity.direction = 'right';
    } else if (distanceFromRight <= maxRight) {
        entity.direction = 'left';
    }
    // Move the obstacle based on the direction
    if (entity.direction === 'right') {
        entity.position[0] += speed;
    } else {
        entity.position[0] -= speed;
    }
}

export default moveObstacleLeftToRight;