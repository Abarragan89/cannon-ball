import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground, Dimensions } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import TNT from "../../../../Components/GameEngine/TNT";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";
import krakenLevelEightSystems from "../../../../systems/krakenMovementSystems/krakenLevelEight";
import Hinderance from "../../../../Components/GameEngine/Hinderance";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";

function ChapterFourLevelEight() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameOverNoDelay, setIsGameOverNoDelay] = useState(false);

    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Kraken',
        nextLevel: 'Kraken/Level9'
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
                    krakenLevelEightSystems
                ]}
                entities={{
                    cannon: {
                        position: [53, Math.floor(screenHeight / 2)],
                        upperTravelLimit: -1,
                        lowerTravelLimit: 1000
                    },
                    TNT: {
                        position: [Math.floor(screenWidth / 2) + 50, 225],
                        display: 'block',
                        handlePosition: [-17, 0],
                        renderer: <TNT />
                    },
                    cannonStand: {
                        position: [50, Math.floor(screenHeight / 2) + 75],
                        height: 15,
                        width: 70,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
                    // This will be directly halfway in screen
                    sideBlockOne: {
                        position: [Math.floor(screenWidth / 2), 150],
                        width: 50,
                        height: 150,
                        renderer: <Hinderance />
                    },
                    sideBlockTwo: {
                        position: [Math.floor(screenWidth / 2) + 250, 150],
                        width: 50,
                        height: 150,
                        renderer: <Hinderance />
                    },
                    topBlockOne: {
                        position: [Math.floor(screenWidth / 2) + 70, 120],
                        width: 30,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    topBlockTwo: {
                        position: [Math.floor(screenWidth / 2) + 135, 120],
                        width: 30,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    topBlockThree: {
                        position: [Math.floor(screenWidth / 2) + 195, 120],
                        width: 30,
                        height: 30,
                        renderer: <Hinderance />
                    },
                }}
                endGameData={endGameData}
                isGameOver={isGameOver}
                setIsGameOverNoDelay={setIsGameOverNoDelay}
                setIsGameOver={setIsGameOver}
            >
                <StatusBar hidden={true} />
                {!isGameOverNoDelay &&
                    <BackArrow
                        route={'/LevelLobbyScreen'}
                        params={{ mapName: 'Kraken' }}
                    />
                }
                <GameLevelInfoHeader
                    mapName={'Kraken'}
                    levelNumber={8}
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
    }
});

export default ChapterFourLevelEight;

