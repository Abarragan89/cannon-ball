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
import krakenLevelTwo from "../../../../systems/krakenMovementSystems/krakenLevelTwo";
import Hinderance from "../../../../Components/GameEngine/Hinderance";

function ChapterFourLevelTwo() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Kraken',
        nextLevel: 'Kraken/Level3'
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
                    createDetectHinderanceSystem,
                    krakenLevelTwo
                ]}
                entities={{
                    cannon: {
                        position: [screenWidth - 200, screenHeight - 100],
                        lowerTravelLimit: Math.floor(screenWidth / 2) + 80,
                    },
                    TNT: {
                        position: [250, screenHeight - 110],
                        display: 'block',
                        handlePosition: [-15, 0],
                        renderer: <TNT />
                    },
                    giantTallOne: {
                        position: [Math.floor(screenWidth / 2), screenHeight - 315],
                        width: 70,
                        height: 300,
                        renderer: <Hinderance />
                    },
                    squareHindOne: {
                        position: [0, screenHeight - 200],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    },
                    squareHindTwo: {
                        position: [Math.floor(screenWidth / 4) - 10, screenHeight - 250],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    },
                    squareHindThree: {
                        position: [Math.floor(screenWidth / 2) - 50, screenHeight - 300],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    }
                }}
                endGameData={endGameData}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}
            >
                <StatusBar hidden={true} />
                <BackArrow
                    route={'/LevelLobbyScreen'}
                    params={{ mapName: 'Kraken' }}
                />
                <GameLevelInfoHeader
                    mapName={'Kraken'}
                    levelNumber={2}
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


export default ChapterFourLevelTwo;
