import { Link } from "expo-router";
import { useState, useRef, useEffect } from "react";
import { GameEngine } from "react-native-game-engine"
import { StyleSheet, StatusBar } from 'react-native';
import cannonControlSystem from "../../utils/cannonControlSystem";
import fireCannonSystem from "../../utils/fireCannonSystem";
import explodeTNTSystem from "../../utils/explodeTNTSystem";
import cannonBallTNTDetectionSystem from "../../utils/cannonBallTNTDetectionSystem";
import CannonBall from "../../Components/GameEngine/CannonBall";
import PowerMeter from "../../Components/GameEngine/ PowerMeter";
import CannonLauncher from "../../Components/GameEngine/CannonLauncher";
import AngleMeter from "../../Components/GameEngine/AngleMeter";
import TNT from "../../Components/GameEngine/TNT";
import Explosion from "../../Components/GameEngine/Explosion";

function BestGameEver() {

    const gameEngineRef = useRef(null);
    
    return (
        <>
            <Link href="/CampaignOverviewScreen">Back to Campaign</Link>
            <GameEngine
                ref={gameEngineRef}
                style={styles.container}
                systems={[cannonControlSystem, fireCannonSystem, explodeTNTSystem, cannonBallTNTDetectionSystem]}
                entities={{
                    // CannonBall starts off Off-Screen then appears once 'long-press' in fireCannonSystem.js
                    cannonBall: { position: [-100, 0], velocity: [1, 1], renderer: <CannonBall /> },
                    powerMeter: { displayLevel: 1, powerLevel: 15, renderer: <PowerMeter /> },
                    angleMeter: { angleLevel: 90, renderer: <AngleMeter /> },
                    cannon: { position: [400, 300], rotate: '-90deg', renderer: <CannonLauncher /> },
                    TNT: { position: [300, 100], display: 'block', handlePosition: [-13, 0], renderer: <TNT /> },
                    explosion: { position: [315, 115], startAnimation: false, renderer: <Explosion /> }
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
