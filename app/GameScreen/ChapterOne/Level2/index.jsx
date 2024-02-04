import { Link } from "expo-router";
import { useRef } from "react";
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
import HeaderStats from "../../../../Components/UI/HeaderStats";
import TNT from "../../../../Components/GameEngine/TNT";
import Explosion from "../../../../Components/GameEngine/Explosion";
import FollowArrow from "../../../../Components/GameEngine/FollowArrow";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions } from 'react-native'
import EndGameModal from "../../../../Components/GameEngine/EndGameModal";
const screenHeight = Dimensions.get('window').height;


function ChatperOneLevelOne() {

    const gameEngineRef = useRef(null);

    return (

        // <ImageBackground 
        // style={styles.imageStyle}
        // source={require('../../assets/images/TNTBox.png')}
        // >
            <GameEngine
                ref={gameEngineRef}
                style={styles.container}
                systems=
                {[
                    cannonControlSystem,
                    fireCannonSystem,
                    explodeTNTSystem,
                    cannonBallTNTDetectionSystem,
                    scoreCalculatorSystem
                ]}
                entities={{
                    // CannonBall starts off Off-Screen then appears once 'long-press' in fireCannonSystem.js
                    cannonBall: {
                        position: [-100, 0],
                        gradientColor: 'rgba(0, 0, 0, 0.6)',
                        color: 'rgba(0, 0, 0, 1)',
                        velocity: [1, 1],
                        display: 'block',
                        accuracy: { name: '', float: 0 },
                        isGameOver: false,
                        isBallMoving: false,
                        renderer: <CannonBall />
                    },
                    powerMeter: {
                        displayLevel: 1,
                        powerLevel: 15,
                        renderer: <PowerMeter />
                    },
                    angleMeter: {
                        angleLevel: 90,
                        renderer: <AngleMeter />
                    },
                    cannon: {
                        position: [400, screenHeight - 90],
                        rotate: '-90deg',
                        renderer: <CannonLauncher />
                    },
                    TNT: {
                        position: [500, 300],
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
                        bounces: 0,
                        renderer: <HeaderStats />
                    },
                    endGameModal: {
                        display: 'none',
                        // currentLevel: 1,
                        // resetGame: false,
                        renderer: <EndGameModal />
                    }
                }}>
                <StatusBar hidden={true} />
                <Link style={styles.backIcon} onPress={() => gameEngineRef.current.stop()} href="/CampaignOverviewScreen">
                    <Ionicons name="arrow-back" size={35} color="#000000b4" />
                </Link>
            </GameEngine>
        // </ImageBackground>
        
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