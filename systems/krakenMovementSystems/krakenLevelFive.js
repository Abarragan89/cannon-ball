// make longHind Move 240 pixels
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

let squareHindOne = 'left'
let squareHindTwo = 'right'
let directionCounterTwo = 0;
let directionCounterOne = 0;

const krakenLevelFiveSystems = (entities) => {
    // if (!entities.cannonBall.isGameOver) {
    //     if (entities.TNT.position[0] > screenWidth - 30) {
    //         direction = 'left';
    //     } 
    //     if (entities.TNT.position[0] < 30) {
    //         direction = 'right';
    //     }
    //     if (direction === 'right') {
    //         entities.TNT.position[0] += 0.5;
    //     } else if (direction === 'left') {
    //         entities.TNT.position[0] -= 0.5;
    //     }
    // }

    function moveSquareOne() {
        const distanceFromLeft = entities.squareHindOne.position[0];
        const distanceFromRight = screenWidth - entities.squareHindOne.position[0];

        // Check if the obstacle should change direction
        if (distanceFromLeft <= Math.floor(screenWidth / 2) - 70) {
            entities.squareHindOne.direction = 'right';
        } else if (distanceFromRight <= 200) {
            entities.squareHindOne.direction = 'left';
        }
        // Move the obstacle based on the direction
        if (entities.squareHindOne.direction === 'right') {
            entities.squareHindOne.position[0] += 1.5;
        } else {
            entities.squareHindOne.position[0] -= 1.5;
        }
    }
    moveSquareOne();

    
    return entities;
}

export default krakenLevelFiveSystems;