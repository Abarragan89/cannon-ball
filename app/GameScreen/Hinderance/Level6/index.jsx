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
import giantTallSystemOne from "../../../../systems/hinderanceDetection/giantTallSystemOne";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";
import Hinderance from "../../../../Components/GameEngine/Hinderances/Hinderance";

function ChapterThreeLevelSix() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [1000, 2500, 5000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Hinderance',
        nextLevel: 'Kraken/Level1'
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
                        position: [screenWidth - 170, screenHeight - 100],
                        display: 'block',
                        handlePosition: [-22, 0],
                        renderer: <TNT />
                    },
                    giantTallOne: {
                        position: [170, screenHeight - 100],
                        width: 70,
                        height: 300,
                        renderer: <Hinderance />
                    },
                    giantTallTwo: {
                        position: [screenWidth - 120, screenHeight - 315],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    longHindOne: {
                        position: [Math.floor(screenWidth / 2) - 45, 120],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    longHindTwo: {
                        position: [Math.floor(screenWidth / 2) - 45, 310],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    longHindThree: {
                        position: [Math.floor(screenWidth / 2) - 45, 310],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    longHindTwoFour: {
                        position: [Math.floor(screenWidth / 2) - 45, 310],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                }}
                endGameData={endGameData}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}
            >
                <StatusBar hidden={true} />
                <BackArrow
                    route={'/LevelLobbyScreen'}
                    params={{ mapName: 'Hinderance' }}
                />
                <GameLevelInfoHeader
                    mapName={'Hinderance'}
                    levelNumber={5}
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
