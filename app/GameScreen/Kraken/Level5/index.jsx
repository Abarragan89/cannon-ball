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
import krakenLevelFiveSystems from "../../../../systems/krakenMovementSystems/krakenLevelFive";
import Hinderance from "../../../../Components/GameEngine/Hinderance";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";

function ChapterFourLevelFive() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Kraken',
        nextLevel: 'Kraken/Level6'
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
                    krakenLevelFiveSystems
                ]}
                entities={{
                    cannon: {
                        position: [screenWidth - 78, 75],
                        upperTravelLimit: -1,
                        lowerTravelLimit: 1000
                    },
                    TNT: {
                        position: [250, 150],
                        display: 'block',
                        handlePosition: [-15, 0],
                        renderer: <TNT />
                    },
                    extraLongHindOne: {
                        position: [-5, -15],
                        width: screenWidth + 10,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    longHindOne: {
                        position: [Math.floor(screenWidth / 2) - 180, screenHeight - 50],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    squareHindOne: {
                        position: [Math.floor(screenWidth / 2), screenHeight - 50],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    },
                    giantTallOne: {
                        position: [Math.floor(screenWidth / 2) + 55, -50],
                        width: 70,
                        height: 300,
                        renderer: <Hinderance />
                    },
                    cannonStand: {
                        position: [screenWidth - 82, 150],
                        height: 15,
                        width: 70,
                        color: colors.sandColor,
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
    }
});


export default ChapterFourLevelFive;