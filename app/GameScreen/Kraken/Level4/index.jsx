import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import CannonBall from "../../../../Components/GameEngine/CannonBall";
import PowerMeter from "../../../../Components/GameEngine/ PowerMeter";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import CannonLauncher from "../../../../Components/GameEngine/CannonLauncher";
import FireBtn from "../../../../Components/GameEngine/FireBtn";
import AngleMeter from "../../../../Components/GameEngine/AngleMeter";
import HeaderStats from "../../../../Components/GameEngine/HeaderStats";
import TNT from "../../../../Components/GameEngine/TNT";
import Explosion from "../../../../Components/GameEngine/Explosion";
import FollowArrow from "../../../../Components/GameEngine/FollowArrow";
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

    // Angle Data
    const angleLevelRef = useRef(90);
    // Power Data
    const powerLevelRef = useRef(15);

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
                    cannonBall: {
                        position: [-100, 0],
                        velocity: [1, 1],
                        display: 'block',
                        accuracy: { name: '', float: 0, multiplier: 0 },
                        isGameOver: isGameOver,
                        setIsGameOver: setIsGameOver,
                        isBallMoving: false,
                        renderer: <CannonBall />
                    },
                    cannon: {
                        position: [Math.floor(screenWidth / 2) - 35, -2],
                        upperTravelLimit: -1,
                        lowerTravelLimit: 1000,
                        rotate: '-90deg',
                        renderer: <CannonLauncher />
                    },
                    TNT: {
                        position: [250, screenHeight - 40],
                        display: 'block',
                        handlePosition: [-20, 0],
                        renderer: <TNT />
                    },
                    explosion: {
                        position: [0, 0],
                        ballPosition: [0, 0],
                        ballColor: '#000000',
                        startAnimation: false,
                        renderer: <Explosion />
                    },
                    followArrow: {
                        leftPosition: 300,
                        displayStatus: 'none',
                        renderer: <FollowArrow />
                    },
                    headerStats: {
                        airTime: 0,
                        bounces: 0,
                        renderer: <HeaderStats />
                    },
                    angleMeter: {
                        angleLevel: angleLevelRef.current,
                        renderer: <AngleMeter />
                    },
                    powerMeter: {
                        displayPower: powerLevelRef.current,
                        renderer: <PowerMeter />
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
                    },
                    fireBtn: {
                        isShooting: false,
                        renderer: <FireBtn />
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
