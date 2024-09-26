import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import TNT from "../../../../Components/GameEngine/TNT";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";
import Hinderance from "../../../../Components/GameEngine/Hinderance";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";
import colors from "../../../../constants/colors";

function ChapterThreeLevelSeven() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameOverNoDelay, setIsGameOverNoDelay] = useState(false);

    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [1000, 2500, 5000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Hinderance',
        nextLevel: 'Hinderance/Level8'
    });

    const midScreen = Math.floor(screenWidth / 2);
    return (
        <ImageBackground
            source={require('../../../../assets/images/basics/level1.png')}
            style={styles.backgroundImg}
        >
            <GameEngineWrapper
                systems=
                {[
                    cannonControlSystem,
                    TNTDetectionSystem,
                    scoreCalculatorSystem,
                    fireCannonSystem,
                    createDetectHinderanceSystem
                ]}
                entities={{
                    cannon: {
                        position: [midScreen - 20, screenHeight - 378],
                        upperTravelLimit: midScreen + 30,
                        lowerTravelLimit: midScreen - 75
                    },
                    cannonStand: {
                        position: [midScreen - 85, screenHeight - 300],
                        width: 200,
                        height: 20,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
                    TNT: {
                        position: [midScreen, screenHeight - 140],
                        display: 'block',
                        handlePosition: [-17, 0],
                        renderer: <TNT />
                    },
                    // LEFT SIDE
                    smallCircleOne: {
                        position: [(midScreen - 160) / 4, screenHeight - 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    smallCircleFour: {
                        position: [midScreen / 3, screenHeight - 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    smallCircleTwo: {
                        position: [midScreen / 2, screenHeight - 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    smallCircleThree: {
                        position: [midScreen - 140, screenHeight - 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    longHindOne: {
                        position: [100, screenHeight - 150],
                        width: 250,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    // RIGHT SIDE
                    smallRectOne: {
                        position: [screenWidth - 100, screenHeight - 260],
                        width: 30,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    smallRectwo: {
                        position: [Math.floor(screenWidth / 2) + 200, screenHeight - 240],
                        width: 30,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    smallRecThree: {
                        position: [Math.floor(screenWidth / 2) + 135, screenHeight - 115],
                        width: 30,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    smallRecFour: {
                        position: [Math.floor(screenWidth / 2) + 230, screenHeight - 80],
                        width: 30,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    smallRecFive: {
                        position: [Math.floor(screenWidth / 2) + 70, screenHeight - 180],
                        width: 30,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    lowerDotOne: {
                        position: [Math.floor(screenWidth / 2) - 50, screenHeight - 250],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    lowerDotTwo: {
                        position: [Math.floor(screenWidth / 2) - 50, screenHeight - 200],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    tallThinRectOne: {
                        position: [Math.floor(screenWidth / 2) + 50, screenHeight - 200],
                        width: 10,
                        height: 30,
                        renderer: <Hinderance />
                    }
                }}
                endGameData={endGameData}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}
                setIsGameOverNoDelay={setIsGameOverNoDelay}
            >
                <StatusBar hidden={true} />
                {!isGameOverNoDelay &&
                    <BackArrow
                        route={'/LevelLobbyScreen'}
                        params={{ mapName: 'Hinderance' }}
                    />
                }
                <GameLevelInfoHeader
                    mapName={'Hinderance'}
                    levelNumber={7}
                />
            </GameEngineWrapper>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImg: {
        position: 'absolute',
        top: -5,
        bottom: 0,
        left: 0,
        right: 0
    },
    container: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        height: screenHeight,
        zIndex: 16
    },
    backIcon: {
        marginTop: 5,
        marginLeft: 5,
        opacity: .7
    },
    imageStyle: {
        flex: 1,
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    }
});


export default ChapterThreeLevelSeven;
