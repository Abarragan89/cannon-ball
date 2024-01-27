import { Link } from "expo-router";
import { GameEngine } from "react-native-game-engine"
import { StyleSheet, StatusBar } from 'react-native';
import cannonControlSystem from "../../utils/cannonControlSystem";
import fireCannonSystem from "../../utils/fireCannonSystem";
import CannonBall from "../../Components/GameEngine/CannonBall";
import PowerMeter from "../../Components/GameEngine/ PowerMeter";
import AngleMeter from "../../Components/GameEngine/AngleMeter";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function BestGameEver() {

    return (
        <>
            <Link href="/CampaignOverviewScreen">Back to Campaign</Link>
            <GameEngine
                style={styles.container}
                systems={[cannonControlSystem, fireCannonSystem]}
                entities={{
                    cannonBall: { position: [20, windowHeight/2], velocity: [1, 1], renderer: <CannonBall /> },
                    powerMeter: { displayLevel: 1, powerLevel: 0.1, renderer: <PowerMeter /> },
                    angleMeter: { angleLevel: 45, renderer: <AngleMeter /> }


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

// entityObj  {"0.8910097501661866": {"position": [700, 300], "renderer": <FireBtn />}}
// {"1": {"position": [770, 330], "renderer": <FireBtn />}}
