import { useRef, useState } from "react";
import { GameEngine } from "react-native-game-engine"
import { StyleSheet, StatusBar } from 'react-native';
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
import BackArrow from "../../../../Components/UI/BackArrow";


function ChatperOneLevelOne() {
    // The game data accepts refs and state for each aspect of the game
    // the ref is used to game data state and remain consistent through rerenders
    // the state is used to manage the components that use that data so rerenders are triggered

    const gameEngineRef = useRef(null);

    const [isGameOver, setIsGameOver] = useState(false);
    console.log(isGameOver)
    // Angle Data
    const [angleLevelState, setAngleLevelState] = useState(90);
    const angleLevelRef = useRef(90)
    // Power Data
    const [powerLevelState, setPowerLevelState] = useState(0);
    const powerLevelRef = useRef(0)
    // Cannon Position Data
    const [cannonPositionState, setCannonPositionState] = useState([0, 100])
    const cannonPositionRef = useRef([0, 100])

    const endGameData = useRef({
        accuracyFloat: 0,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,

    })
    return (

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
            ]}
            entities={{
                cannonBall: {
                    position: [-100, 0],
                    gradientColor: 'rgba(0, 0, 0, 0.6)',
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
                    setCannonPositionState: setCannonPositionState,
                    endGameData: endGameData

                },
                cannon: {
                    position: [400, screenHeight - 85],
                    rotate: '-90deg',
                    renderer: <CannonLauncher />
                },
                TNT: {
                    position: [300, 100],
                    display: 'block',
                    handlePosition: [-13, 0],
                    renderer: <TNT />
                },
                explosion: {
                    position: [315, 115],
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
            <BackArrow />

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
            />
            <AngleMeter angleLevel={angleLevelState} />
            <PowerMeter displayPower={powerLevelState} />
        </GameEngine>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#31b5ea",
        width: '100%',
        height: screenHeight
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


export default ChatperOneLevelOne;
