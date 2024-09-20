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

function ChapterThreeLevelSix() {
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
        nextLevel: 'Hinderance/Level7'
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
                        upperTravelLimit: Math.floor(screenWidth / 2) - 245,
                    },
                    TNT: {
                        position: [screenWidth - 140, screenHeight - 100],
                        display: 'block',
                        handlePosition: [-17, 0],
                        renderer: <TNT />
                    },
                    //  Big blocking block
                    giantTallOne: {
                        position: [Math.floor(screenWidth / 2) - 164, screenHeight - 320],
                        width: 150,
                        height: 300,
                        renderer: <Hinderance />
                    },
                    // Center Point
                    longHindFive: {
                        position: [screenWidth - 440, screenHeight - 320],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    // Steps going down
                    longHindSix: {
                        position: [screenWidth - 380, screenHeight - 260],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    longHindSeven: {
                        position: [screenWidth - 320, screenHeight - 200],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    longHindTwoEight: {
                        position: [screenWidth - 260, screenHeight - 140],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    smallBlockOne: {
                        position: [screenWidth - 120, screenHeight - 240],
                        width: 20,
                        height: 20,
                        renderer: <Hinderance />
                    },
                    smallBlockTwo: {
                        position: [screenWidth - 60, screenHeight - 140],
                        width: 20,
                        height: 20,
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
                    levelNumber={6}
                />
            </GameEngineWrapper>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImg: {
        position: 'absolute',
        top: -85,
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


export default ChapterThreeLevelSix;
