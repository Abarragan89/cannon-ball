import { useRef, useState, useEffect } from "react";
import { GameEngine } from "react-native-game-engine"
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import explodeTNTSystem from "../../../../systems/explodeTNTSystem";
import cannonBallTNTDetectionSystem from "../../../../systems/cannonBallTNTDetectionSystem";
import CannonBall from "../../../../Components/GameEngine/CannonBall";
import PowerMeter from "../../../../Components/GameEngine/ PowerMeter";
import CannonLauncher from "../../../../Components/GameEngine/CannonLauncher";
import MoveCannonLaunch from "../../../../Components/GameEngine/MoveCannonLaunch";
import AngleMeter from "../../../../Components/GameEngine/AngleMeter";
import HeaderStats from "../../../../Components/GameEngine/HeaderStats";
import TNT from "../../../../Components/GameEngine/TNT";
import Explosion from "../../../../Components/GameEngine/Explosion";
import FollowArrow from "../../../../Components/GameEngine/FollowArrow";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
import EndGameModal from "../../../../Components/GameEngine/EndGameModal";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";
import CannonStand from "../../../../Components/GameEngine/Hinderances/CannonStand";
import SmallSquareHind from "../../../../Components/GameEngine/Hinderances/SmallSquareHind";
import smallSquareSystemOne from "../../../../systems/hinderanceDetection/smallSquareSystemOne";
import LongHind from '../../../../Components/GameEngine/Hinderances/LongHind';
import longHindSystemOne from "../../../../systems/hinderanceDetection/longHindSystemOne";
import GiantTallHind from "../../../../Components/GameEngine/Hinderances/GiantTallHind";
import giantTallSystemOne from "../../../../systems/hinderanceDetection/giantTallSystemOne";
import ExtraLongHind from "../../../../Components/GameEngine/Hinderances/ExtraLongHind";
import extraLongHindSystemOne from "../../../../systems/hinderanceDetection/extraLongHindSystemOne";
import krakenLevelFiveSystems from "../../../../systems/krakenMovementSystems/krakenLevelFive";
import cannonStandDetectionSystem from "../../../../systems/hinderanceDetection/cannonStandDetection";

function ChapterFourLevelFive() {
    // The game data accepts refs and state for each aspect of the game
    // the ref is used to game data state and remain consistent through rerenders
    // the state is used to manage the components that use that data so rerenders are triggered

    const gameEngineRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    // Angle Data
    const angleLevelRef = useRef(90)
    // Power Data
    const powerLevelRef = useRef(15)
    // Cannon Position Data
    const [cannonPositionState, setCannonPositionState] = useState([screenWidth - 80, 150])
    const cannonPositionRef = useRef([screenWidth - 80, 150])

    const endGameData = useRef({
        accuracyFloat: 0,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        nextLevel: 'Ghost/Level1'
    })

    useEffect(() => {
        return () => {
            if (gameEngineRef.current && gameEngineRef.current.stop) {
                gameEngineRef.current.stop();
            }
        }
    }, [gameEngineRef.current])
    return (

        <ImageBackground
            source={require('../../../../assets/images/basics/level1.png')}
            style={styles.backgroundImg}
        >
            <GameEngine
                ref={gameEngineRef}
                style={styles.container}
                systems=
                {[
                    cannonControlSystem,
                    explodeTNTSystem,
                    cannonBallTNTDetectionSystem,
                    scoreCalculatorSystem,
                    fireCannonSystem,
                    smallSquareSystemOne,
                    longHindSystemOne,
                    giantTallSystemOne,
                    extraLongHindSystemOne,
                    cannonStandDetectionSystem,
                    krakenLevelFiveSystems
                ]}
                entities={{
                    cannonBall: {
                        position: [-100, 0],
                        gradientColor: 'rgba(0, 0, 0, .75)',
                        color: 'rgba(0, 0, 0, 1)',
                        velocity: [1, 1],
                        display: 'block',
                        accuracy: { name: '', float: 0, multiplier: 0 },
                        isGameOver: isGameOver,
                        setIsGameOver: setIsGameOver,
                        isBallMoving: false,
                        renderer: <CannonBall />
                    },
                    gameData: {
                        cannonLaunchPosition: cannonPositionRef,
                        endGameData: endGameData,
                        bounceLevel: 0.8
                    },
                    cannon: {
                        // only the postiion[0] gets updated by ref variables.
                        position: [400, 75],
                        rotate: '-90deg',
                        renderer: <CannonLauncher />
                    },
                    TNT: {
                        position: [250, 150],
                        display: 'block',
                        handlePosition: [-13, 0],
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
                    extraLongHindOne: {
                        position: [-5, 0],
                        renderer: <ExtraLongHind />
                    },
                    longHindOne: {
                        position: [Math.floor(screenWidth / 2) - 180, screenHeight - 50],
                        renderer: <LongHind />
                    },
                    // this is the square closest to the cannon
                    squareHindOne: {
                        position: [Math.floor(screenWidth / 2), screenHeight - 50],
                        renderer: <SmallSquareHind />
                    },
                    giantTallOne: {
                        position: [Math.floor(screenWidth / 2) + 55, -50],
                        renderer: <GiantTallHind />
                    },
                    cannonStand: {
                        position: [screenWidth - 82, 150],
                        renderer: <CannonStand />
                    }

                }}>
                <StatusBar hidden={true} />
                <BackArrow
                    route={'/LevelLobbyScreen'}
                    params={{ mapName: 'Kraken' }}
                />

                {isGameOver &&
                    <EndGameModal
                        endGameData={endGameData}
                    />
                }
                {/* The action is happending in this component
                I need to change state in this components when 
                the slider onValueChange function fires
             */}
                <MoveCannonLaunch
                    updatePositionRef={cannonPositionRef}
                    setPosition={setCannonPositionState}
                    position={cannonPositionState}
                    upperLimit={screenWidth - 70}
                    lowerLimit={5}
                />
            </GameEngine>
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


export default ChapterFourLevelFive;
