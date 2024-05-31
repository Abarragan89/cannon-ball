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
import CannonStand from "../../../../Components/GameEngine/Hinderances/CannonStand";
import krakenLevelFour from "../../../../systems/krakenMovementSystems/krakenLevelFour";
import smallSquareSystemOne from "../../../../systems/hinderanceDetection/smallSquareSystemOne";
import smallSquareSystemTwo from "../../../../systems/hinderanceDetection/smallSquareSystemTwo";
import longHindSystemOne from "../../../../systems/hinderanceDetection/longHindSystemOne";
import longHindSystemTwo from "../../../../systems/hinderanceDetection/longHindSystemTwo";
import longHindSystemThree from "../../../../systems/hinderanceDetection/longHindSystemThree";
import longHindSystemFour from "../../../../systems/hinderanceDetection/longHindSystemFour";
import cannonDetectionSystem from "../../../../systems/hinderanceDetection/cannonStandDetection";
import Hinderance from "../../../../Components/GameEngine/Hinderances/Hinderance";

function ChapterFourLevelFour() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Kraken',
        nextLevel: 'Kraken/Level5'
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
                    cannonDetectionSystem,
                    krakenLevelFour,
                    smallSquareSystemOne,
                    smallSquareSystemTwo,
                    longHindSystemOne,
                    longHindSystemTwo,
                    longHindSystemThree,
                    longHindSystemFour
                ]}
                entities={{
                    cannon: {
                        position: [Math.floor(screenWidth / 2) - 35, -2],
                        upperTravelLimit: -1,
                        lowerTravelLimit: 1000,
                    },
                    TNT: {
                        position: [250, screenHeight - 40],
                        display: 'block',
                        handlePosition: [-22, 0],
                        renderer: <TNT />
                    },
                    cannonStand: {
                        position: [Math.floor(screenWidth / 2) - 35, 75],
                        renderer: <CannonStand />
                    },
                    squareHindOne: {
                        position: [0, 100],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    },
                    squareHindTwo: {
                        position: [screenWidth - 40, 100],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    },
                    longHindOne: {
                        position: [Math.floor(screenWidth / 2) - 120, 180],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    longHindTwo: {
                        position: [Math.floor(screenWidth / 2), 180],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    longHindThree: {
                        position: [0, 260],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    longHindFour: {
                        position: [screenWidth - 120, 260],
                        width: 120,
                        height: 30,
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
                    levelNumber={4}
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


export default ChapterFourLevelFour;
