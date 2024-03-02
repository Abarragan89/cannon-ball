import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

let squareDirection = 'left';
let longDirection = 'up';
let TNTDirection = 'up';
let TNTMovementCounter = 0;

const krakenLevelThree = (entities) => {
    if (!entities.cannonBall.isGameOver) {
        // Move square Hinderance
        if (entities.squareHindOne.position[0] > Math.floor(screenWidth / 2) + 100) {
            squareDirection = 'left';
        }
        if (entities.squareHindOne.position[0] < 150) {
            squareDirection = 'right';
        }
        if (squareDirection === 'right') {
            entities.squareHindOne.position[0] += 1;
        } else if (squareDirection === 'left') {
            entities.squareHindOne.position[0] -= 1;
        }

        // Move long Hinderance
        if (entities.longHindTwo.position[1] > Math.floor(screenHeight/2)) {
            longDirection = 'up';
        }
        if (entities.longHindTwo.position[1] < 100) {
            longDirection = 'down';
        }
        if (longDirection === 'down') {
            entities.longHindTwo.position[1] += .6;
        } else if (longDirection === 'up') {
            entities.longHindTwo.position[1] -= .6;
        }


        // Move TNT 
        if (TNTMovementCounter >= 300) {
            TNTDirection = 'up';
        }
        if (TNTMovementCounter <= 0) {
            TNTDirection = 'down';
        }
        if (TNTDirection === 'down') {
            entities.TNT.position[1] += .2;
            TNTMovementCounter += 1
        } else if (TNTDirection === 'up') {
            entities.TNT.position[1] -= .2;
            TNTMovementCounter -= 1
        }
    }


    return entities;
}

export default krakenLevelThree;