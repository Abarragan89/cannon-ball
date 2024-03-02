import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


let TNTDirection = 'left';
let squareOneDirection = 'right';
let squareTwoDirection = 'left';
let longHindOneDirection = 'left';
let longHindTwoDirection = 'right';

const krakenLevelFour = (entities) => {

    if (!entities.cannonBall.isGameOver) {
        // Move TNT 
        if (entities.TNT.position[0] > screenWidth - 30) {
            TNTDirection = 'left';
        } 
        if (entities.TNT.position[0] <= 0) {
            TNTDirection = 'right';
        }
        if (TNTDirection === 'right') {
            entities.TNT.position[0] += .8;
        } else if (TNTDirection === 'left') {
            entities.TNT.position[0] -= .8;
        }

        // Move Square One
        if (entities.squareHindOne.position[0] >= Math.floor(screenWidth / 2) - 40) {
            squareOneDirection = 'left';
        } 
        if (entities.squareHindOne.position[0] <= 0) {
            squareOneDirection = 'right';
        }
        if (squareOneDirection === 'right') {
            entities.squareHindOne.position[0] += 1;
        } else if (squareOneDirection === 'left') {
            entities.squareHindOne.position[0] -= 1;
        }

        // Move Square Two
        if (entities.squareHindTwo.position[0] >= screenWidth - 40) {
            squareTwoDirection = 'left';
        } 
        if (entities.squareHindTwo.position[0] <= Math.floor(screenWidth / 2)) {
            squareTwoDirection = 'right';
        }
        if (squareTwoDirection === 'right') {
            entities.squareHindTwo.position[0] += 1;
        } else if (squareTwoDirection === 'left') {
            entities.squareHindTwo.position[0] -= 1;
        }

        // Move Long Hinderance One and Three
        if (entities.longHindOne.position[0] >= Math.floor(screenWidth/2) - 120) {
            longHindOneDirection = 'left';
        } 
        if (entities.longHindOne.position[0] <= 0) {
            longHindOneDirection = 'right';
        }
        if (longHindOneDirection === 'right') {
            entities.longHindOne.position[0] += 1;
            entities.longHindThree.position[0] -=1;
        } else if (longHindOneDirection === 'left') {
            entities.longHindOne.position[0] -= 1;
            entities.longHindThree.position[0] +=1;

        }

        // Move Long Hinderance Two and Four
        if (entities.longHindTwo.position[0] >= screenWidth - 120) {
            longHindTwoDirection = 'left';
        } 
        if (entities.longHindTwo.position[0] <= Math.floor(screenWidth/2)) {
            longHindTwoDirection = 'right';
        }
        if (longHindTwoDirection === 'right') {
            entities.longHindTwo.position[0] += 1;
            entities.longHindFour.position[0] -= 1;
        } else if (longHindTwoDirection === 'left') {
            entities.longHindTwo.position[0] -= 1;
            entities.longHindFour.position[0] += 1;

        }
    }

    return entities;
}

export default krakenLevelFour;