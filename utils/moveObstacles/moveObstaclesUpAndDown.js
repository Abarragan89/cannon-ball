import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;


function moveObstacleUpAndDown(entity, maxTop, maxBottom, speed) {
    const distanceFromTop = entity.position[1];
    const distanceFromBottom = screenHeight - entity.position[1];
    
    // Move long Hinderance
    if (distanceFromBottom <= maxBottom) {
        entity.direction = 'up';
    }
    if (distanceFromTop <= maxTop) {
        entity.direction = 'down'; 
    }
    if (entity.direction === 'down') {
        entity.position[1] += speed;
    } else {
        entity.position[1] -= speed;
    }
}

export default moveObstacleUpAndDown;