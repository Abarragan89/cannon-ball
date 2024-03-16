import { useRef, useState } from "react";
import { GameEngine } from "react-native-game-engine"
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import CannonBall from "../../../../Components/GameEngine/CannonBall";
import PowerMeter from "../../../../Components/GameEngine/ PowerMeter";
import CannonLauncher from "../../../../Components/GameEngine/CannonLauncher";

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
import krakenLevelFour from "../../../../systems/krakenMovementSystems/krakenLevelFour";
import SmallSquareHind from "../../../../Components/GameEngine/Hinderances/SmallSquareHind";
import smallSquareSystemOne from "../../../../systems/hinderanceDetection/smallSquareSystemOne";
import smallSquareSystemTwo from "../../../../systems/hinderanceDetection/smallSquareSystemTwo";
import LongHind from "../../../../Components/GameEngine/Hinderances/LongHind";
import longHindSystemOne from "../../../../systems/hinderanceDetection/longHindSystemOne";
import longHindSystemTwo from "../../../../systems/hinderanceDetection/longHindSystemTwo";
import longHindSystemThree from "../../../../systems/hinderanceDetection/longHindSystemThree";
import longHindSystemFour from "../../../../systems/hinderanceDetection/longHindSystemFour";
import cannonDetectionSystem from "../../../../systems/hinderanceDetection/cannonStandDetection";


function ChapterFourLevelFour() {
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
    const [cannonPositionState, setCannonPositionState] = useState([Math.floor(screenWidth / 2) - 34, 100])
    const cannonPositionRef = useRef([Math.floor(screenWidth / 2) - 34, 100])

    const endGameData = useRef({
        accuracyFloat: 0,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        nextLevel: 'Kraken/Level5'
    })
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
                        bounceLevel: .9
                    },
                    cannon: {
                        // only the postiion[0] gets updated by ref variables.
                        position: [400, -2],
                        rotate: '-90deg',
                        renderer: <CannonLauncher />
                    },
                    TNT: {
                        position: [250, screenHeight - 40],
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
                    cannonStand: {
                        position: [Math.floor(screenWidth / 2) - 35, 75], 
                        renderer: <CannonStand />
                    },
                    squareHindOne: {
                        position: [0, 100],
                        renderer: <SmallSquareHind />
                    },
                    squareHindTwo: {
                        position: [screenWidth - 40, 100],
                        renderer: <SmallSquareHind />
                    },
                    longHindOne: {
                        position: [Math.floor(screenWidth/2) - 120, 180],
                        renderer: <LongHind />
                    },
                    longHindTwo: {
                        position: [Math.floor(screenWidth/2), 180],
                        renderer: <LongHind />
                    },
                    longHindThree: {
                        position: [0, 260],
                        renderer: <LongHind />
                    },
                    longHindFour: {
                        position: [screenWidth - 120, 260],
                        renderer: <LongHind />
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
                    upperLimit={-1}
                    lowerLimit={1000}
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


export default ChapterFourLevelFour;
