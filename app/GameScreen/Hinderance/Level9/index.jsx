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
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";
import Hinderance from "../../../../Components/GameEngine/Hinderance";
import colors from "../../../../constants/colors";

function ChapterThreeLevelNine() {
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
        nextLevel: 'Hinderance/Level10'
    });

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
                        position: [40, screenHeight - 100],
                    },
                    TNT: {
                        position: [screenWidth - 100, 210],
                        display: 'block',
                        handlePosition: [-17, 0],
                        renderer: <TNT />
                    },
                    // Inner Blocking Blocks (starting from bottom -> top)
                    blockingHindOne: {
                        position: [screenWidth - 170, 190],
                        color: colors.sandColor,
                        display: 'block',
                        width: 10,
                        height: 25,
                        renderer: <Hinderance />
                    },
                    blockingHindTwo: {
                        position: [screenWidth - 170, 130],
                        color: colors.sandColor,
                        display: 'block',
                        width: 10,
                        height: 25,
                        renderer: <Hinderance />
                    },
                    // blockingHindThree: {
                    //     position: [screenWidth - 170, 90],
                    //     color: colors.sandColor,
                    //     display: 'block',
                    //     width: 10,
                    //     height: 25,
                    //     renderer: <Hinderance />
                    // },
                    // These Hinderance start with the left hinderance in the entrance, and moves around the container
                    longHindOne: {
                        position: [200, 50],
                        width: 20,
                        height: 210,
                        renderer: <Hinderance />
                    },
                    longHindTwo: {
                        position: [200, 10],
                        width: screenWidth - 220,
                        height: 20,
                        renderer: <Hinderance />
                    },
                    longHindThree: {
                        position: [screenWidth - 40, 50],
                        width: 20,
                        height: 210,
                        renderer: <Hinderance />
                    },
                    longHindTNTBase: {
                        position: [screenWidth - 260, 240],
                        width: 240,
                        height: 20,
                        renderer: <Hinderance />
                    },
                    longHindFour: {
                        position: [screenWidth - 260, 120],
                        width: 20,
                        height: 140,
                        renderer: <Hinderance />
                    },
                    longHindFive: {
                        position: [280, 90],
                        width: screenWidth - 520,
                        height: 20,
                        renderer: <Hinderance />
                    },
                    longHindSix: {
                        position: [280, 120],
                        width: 20,
                        height: 140,
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
                    levelNumber={9}
                />
            </GameEngineWrapper>
        </ImageBackground >
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


export default ChapterThreeLevelNine;
