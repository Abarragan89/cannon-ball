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
import krakenLevelNineSystems from "../../../../systems/krakenMovementSystems/krakenLevelNine";
import Hinderance from "../../../../Components/GameEngine/Hinderance";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";

function ChapterFourLevelNine() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Kraken',
        nextLevel: 'Kraken/Level10'
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
                    krakenLevelNineSystems
                ]}
                entities={{
                    cannon: {
                        position: [Math.floor(screenWidth / 5), Math.floor(screenHeight / 2)],
                        upperTravelLimit: -1,
                        lowerTravelLimit: 1000
                    },
                    TNT: {
                        position: [Math.floor(screenWidth / 2) + 160, 225],
                        display: 'block',
                        handlePosition: [-22, 0],
                        renderer: <TNT />
                    },
                    cannonStand: {
                        position: [Math.floor(screenWidth / 5) - 3, Math.floor(screenHeight / 2) + 75],
                        height: 15,
                        width: 70,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
                    // The two lower big blocks
                    bottomBlockOne: {
                        position: [Math.floor(screenWidth / 2), 150],
                        width: 100,
                        height: screenHeight - 150,
                        renderer: <Hinderance />
                    },
                    backBlock: {
                        position: [Math.floor(screenWidth / 2) + 250, 0],
                        width: 100,
                        height: screenHeight,
                        renderer: <Hinderance />
                    },
                    // The two upper big blocks
                    topBlockOne: {
                        position: [Math.floor(screenWidth / 2), 0],
                        width: 100,
                        height: 100,
                        renderer: <Hinderance />
                    },
                    roofBlock: {
                        position: [Math.floor(screenWidth / 2) + 100, 0],
                        width: 150,
                        height: 20,
                        renderer: <Hinderance />
                    },
                    floorBlock: {
                        position: [Math.floor(screenWidth / 2) + 160, screenHeight - 50],
                        width: 30,
                        height: 20,
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
                    levelNumber={9}
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
    }
});

export default ChapterFourLevelNine;

