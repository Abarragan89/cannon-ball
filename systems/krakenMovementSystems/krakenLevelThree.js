import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

let angle = '0deg';
let angleNum = 0;

const krakenLevelThree = (entities) => {

    if (!entities.cannonBall.isGameOver) {

        angleNum += 1

        angle = `${angleNum}deg`

        entities.longHindOne.rotate = angle

    }
    return entities;
}

export default krakenLevelThree;