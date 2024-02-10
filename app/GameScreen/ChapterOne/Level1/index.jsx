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
    const gameEngineRef = useRef(null);

    const [isGameOver, setIsGameOver] = useState(false);
    const [angleLevelState, setAngleLevelState] = useState(90);
    const angleLevel = useRef(90)
    const [powerLevelState, setPowerLevelState] = useState(0);
    const powerLevel = useRef(0)

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
                    isGameOver: false,
                    isBallMoving: false,
                    renderer: <CannonBall />
                },
                cannonControls: {
                    // useRef to update meter
                    displayPowerLevel: powerLevel,
                    // powerLevel is only used internally in entities.
                    powerLevel: 10,
                    // useState to update meter
                    setDisplayPowerLevel: setPowerLevelState,
                    angleLevel: angleLevel,
                    setAngleLevel: setAngleLevelState
                    
                },
                // powerMeter: {
                //     renderer: <PowerMeter />
                // },
                // angleMeter: {
                //     angleLevel: 90,
                //     renderer: <AngleMeter />
                // },
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
                moveCannonLaunch: {
                    position: [0, 100],
                    renderer: <MoveCannonLaunch />
                },
                followArrow: {
                    leftPosition: 300,
                    displayStatus: 'none',
                    renderer: <FollowArrow />
                },
                headerStats: {
                    airTime: 0,
                    bounces: 1,
                    renderer: <HeaderStats />
                },
                endGameModal: {
                    display: 'none',
                    currentLevel: 1,
                    accuracyFloat: 0,
                    accuracyName: '',
                    winningScore: [500, 1000, 2000],
                    airTime: 0,
                    bounces: 1,
                    multiplier: 0,
                    resetGame: () => setIsGameResetting(true),
                    renderer: <EndGameModal />
                }
            }}>
            <StatusBar hidden={true} />
            <BackArrow />


            <AngleMeter angleLevel={angleLevelState} />
            <PowerMeter displayLevel={powerLevelState}/>
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
