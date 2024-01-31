import { Link } from "expo-router";
import { useRef } from "react";
import { GameEngine } from "react-native-game-engine"
import { StyleSheet, StatusBar } from 'react-native';
import cannonControlSystem from "../../systems/cannonControlSystem";
import fireCannonSystem from "../../systems/fireCannonSystem";
import explodeTNTSystem from "../../systems/explodeTNTSystem";
import cannonBallTNTDetectionSystem from "../../systems/cannonBallTNTDetectionSystem";
import moveLauncherSystem from "../../systems/moveLauncherSystem";
import CannonBall from "../../Components/GameEngine/CannonBall";
import PowerMeter from "../../Components/GameEngine/ PowerMeter";
import CannonLauncher from "../../Components/GameEngine/CannonLauncher";
import MoveCannonLaunch from "../../Components/GameEngine/MoveCannonLaunch";
import AngleMeter from "../../Components/GameEngine/AngleMeter";
import TNT from "../../Components/GameEngine/TNT";
import Explosion from "../../Components/GameEngine/Explosion";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width

function BestGameEver() {

    const gameEngineRef = useRef(null);

    return (
        <>
            <Link href="/CampaignOverviewScreen">Back to Campaign</Link>
            <GameEngine
                ref={gameEngineRef}
                style={styles.container}
                systems=
                {[
                    cannonControlSystem,
                    fireCannonSystem,
                    explodeTNTSystem,
                    cannonBallTNTDetectionSystem,
                    moveLauncherSystem
                ]}
                entities={{
                    // CannonBall starts off Off-Screen then appears once 'long-press' in fireCannonSystem.js
                    cannonBall: {
                        position: [-100, 0],
                        color: '#6fd68ac8',
                        velocity: [1, 1],
                        display: 'block',
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
                        position: [400, 300],
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
                        ballColor: '#6fd68ac8',
                        startAnimation: false,
                        renderer: <Explosion />
                    },
                    moveCannonLaunch: {
                        position: [0, 100],
                        renderer: <MoveCannonLaunch />
                    }
                }}>
                <StatusBar hidden={true} />
            </GameEngine>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});


export default BestGameEver;
