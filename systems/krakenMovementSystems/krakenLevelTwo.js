import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

let squareOneDirection = 'left';
let squareTwoDirection = 'right';
let squareThreeDirection = 'left';
let tntDirection = 'left'

const krakenLevelTwo = (entities) => {
    if (!entities.cannonBall.isGameOver) {
        // // Move the first square entity
        if (entities.squareHindOne.position[0] > (Math.floor(screenWidth) / 2) - 40) {
            squareOneDirection = 'left';
        }
        if (entities.squareHindOne.position[0] <= 0) {
            squareOneDirection = 'right';
        }
        if (squareOneDirection === 'right') {
            entities.squareHindOne.position[0] += 2;
        } else if (squareOneDirection === 'left') {
            entities.squareHindOne.position[0] -= 2;
        }

        // Move the second square entity
        if (entities.squareHindTwo.position[0] > (Math.floor(screenWidth) / 2) - 40) {
            squareTwoDirection = 'left';
        }
        if (entities.squareHindTwo.position[0] <= 0) {
            squareTwoDirection = 'right';
        }
        if (squareTwoDirection === 'right') {
            entities.squareHindTwo.position[0] += 2;
        } else if (squareTwoDirection === 'left') {
            entities.squareHindTwo.position[0] -= 2;
        }

        // Move the third square entity
        if (entities.squareHindThree.position[0] > (Math.floor(screenWidth) / 2) - 40) {
            squareThreeDirection = 'left';
        }
        if (entities.squareHindThree.position[0] <= 0) {
            squareThreeDirection = 'right';
        }
        if (squareThreeDirection === 'right') {
            entities.squareHindThree.position[0] += 2;
        } else if (squareThreeDirection === 'left') {
            entities.squareHindThree.position[0] -= 2;
        }


        // Move the TNT
        // Move the first square entity
        if (entities.TNT.position[0] > (Math.floor(screenWidth) / 2) - 40) {
            tntDirection = 'left';
        }
        if (entities.TNT.position[0] <= 0) {
            tntDirection = 'right';
        }
        if (tntDirection === 'right') {
            entities.TNT.position[0] += 0.5;
        } else if (tntDirection === 'left') {
            entities.TNT.position[0] -= 0.5;
        }
    }
    return entities;
}

export default krakenLevelTwo;