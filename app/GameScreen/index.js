import { Link } from "expo-router";
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
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function BestGameEver() {

    return (
        <>
            <Link href="/CampaignOverviewScreen">Back to Campaign</Link>
            <GameEngine
                style={styles.container}
                systems={[cannonControlSystem, fireCannonSystem, explodeTNTSystem, cannonBallTNTDetectionSystem]}
                entities={{
                    // CannonBall starts off Off-Screen then appears once 'long-press' in fireCannonSystem.js
                    cannonBall: { position: [-100, windowHeight - 200], velocity: [1, 1], renderer: <CannonBall /> },
                    powerMeter: { displayLevel: 1, powerLevel: 15, renderer: <PowerMeter /> },
                    angleMeter: { angleLevel: 0, renderer: <AngleMeter /> },
                    cannon: { position: [20, windowHeight / 2], rotate: '0deg', renderer: <CannonLauncher />},
                    TNT: { position: [300, 100], handlePosition: -13, renderer: <TNT />}
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
