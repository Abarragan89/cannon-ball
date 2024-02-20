import { useRef, useState } from "react";
import { GameEngine } from "react-native-game-engine"
import { StyleSheet, StatusBar, ImageBackground, PanResponder } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import explodeTNTSystem from "../../../../systems/explodeTNTSystem";
import cannonBallTNTDetectionSystem from "../../../../systems/cannonBallTNTDetectionSystem";
import moveTNTSystem from "../../../../systems/moveTNTSystem";
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
import PowerAngleControl from "../../../../Components/GameEngine/PowerAngleControl";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";


function ChatperTwoLevelOne() {
    // The game data accepts refs and state for each aspect of the game
    // the ref is used to game data state and remain consistent through rerenders
    // the state is used to manage the components that use that data so rerenders are triggered

    const gameEngineRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    // Angle Data
    const [angleLevelState, setAngleLevelState] = useState(90);
    const angleLevelRef = useRef(90)
    // Power Data
    const [powerLevelState, setPowerLevelState] = useState(0);
    // This powerLevel is for Display
    const powerLevelRef = useRef(15)
    // Cannon Position Data
    const [cannonPositionState, setCannonPositionState] = useState([Math.floor(screenWidth / 2) - 100, 100])
    const cannonPositionRef = useRef([Math.floor(screenWidth / 2) - 100, 100])
    // Cannon Rotate Data
    const rotateDegrees = useRef('-90deg')

    const [triggerRerender, setTriggerRerender] = useState(false)

    const endGameData = useRef({
        accuracyFloat: 0,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        nextLevel: 'Basics/Level2'
    })

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onStartShouldSetResponderCapture: () => true,
            onMoveShouldSetResponderCapture: () => true,
            onPanResponderMove: (event, gestureState) => {
                // console.log('hey from pan ', gestureState)

                // const deltaY = gestureState.dy;
                // const deltaX = gestureState.dx;

                // // Define the sensitivity factor for interpolation
                // const angleSensitivity = 0.008;
                // const powerSensitiviy = 0.005

                // // Interpolate power changes based on vertical movement
                // const powerChange = -deltaY * angleSensitivity;
                // powerLevelRef.current = Math.max(0, Math.min(75, powerLevelRef.current + powerChange));
                // setPowerLevelState(powerLevelRef.current);

                // // Interpolate angle changes based on horizontal movement
                // const angleChange = -deltaX * powerSensitiviy;
                // angleLevelRef.current = Math.max(0, Math.min(180, angleLevelRef.current + angleChange));
                // setAngleLevelState(angleLevelRef.current);
                // // Rotate the cannon
                // rotateDegrees.current = `${angleChange}deg`
                // entities.cannon.rotate = `-${entities.gameData.angleLevel.current}deg`;
                // setTriggerRerender( prev => !prev)
            },
        })
    ).current;


    return (
        // <View
        //     style={styles.outterView}
        //     // {...panResponder.panHandlers}
        // >
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
                        moveTNTSystem
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
                            // internal data for the physics. Not connected to UI
                            powerLevel: 15,
                            // Power Data
                            setDisplayPowerLevel: setPowerLevelState,
                            displayPowerLevel: powerLevelRef,
                            // Angle Data
                            angleLevel: angleLevelRef,
                            setAngleLevel: setAngleLevelState,
                            // Cannon Position Data
                            cannonLaunchPosition: cannonPositionRef,
                            endGameData: endGameData
                        },
                        cannon: {
                            // only the postiion[0] gets updated by ref variables.
                            position: [400, screenHeight - 90],
                            rotate: '-90deg',
                            renderer: <CannonLauncher />
                        },
                        TNT: {
                            position: [250, 100],
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
                    }}>
                    <StatusBar hidden={true} />
                    <BackArrow
                        route={'/LevelLobbyScreen'}
                        params={{ mapName: 'Marks' }}
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
                        upperLimit={screenWidth - 90}
                        lowerLimit={20}
                    />
                    {/* <PowerAngleControl
                    // Power Data
                    setDisplayPowerLevel={setPowerLevelState}
                    displayPowerLevel={powerLevelRef}
                    powerLevel={powerLevelRef}
                    // Angle Data
                    angleLevel={angleLevelRef}
                    setAngleLevel={setAngleLevelState}

                /> */}
                    <AngleMeter angleLevel={angleLevelState} />
                    <PowerMeter displayPower={powerLevelState} />
                </GameEngine>
            </ImageBackground>
        // </View>

    );
}

const styles = StyleSheet.create({
    outterView: {
        flex: 1
    },
    backgroundImg: {
        position: 'absolute',
        top: -85,
        bottom: 0,
        left: 0,
        right: 0,
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


export default ChatperTwoLevelOne;
