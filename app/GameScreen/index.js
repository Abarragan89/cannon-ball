import { Link } from "expo-router";
import { GameEngine } from "react-native-game-engine"
import { StyleSheet, StatusBar } from 'react-native';
import cannonControlSystem from "../../utils/cannonControlSystem";
import fireCannonSystem from "../../utils/fireCannonSystem";
import CannonBall from "../../Components/GameEngine/CannonBall";
import PowerMeter from "../../Components/GameEngine/ PowerMeter";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function BestGameEver() {

    // const [cannonBallArray, setCannonBallArray] = useState([{ id: 1, position: [400, 100], renderer: <FireBtn /> }])

    // function showBallHandler() {
    //     const newEntity = { id: Math.random(), position: [700, 300], renderer: <FireBtn /> };
    //     setCannonBallArray((prevEntities) => [...prevEntities, newEntity]);
    // }

    return (
        <>
            <Link href="/CampaignOverviewScreen">Back to Campaign</Link>
            {/* <Pressable onPress={showBallHandler}>
                <Text>Press me</Text>
            </Pressable> */}

            <GameEngine
                style={styles.container}
                systems={[cannonControlSystem, fireCannonSystem]}
                entities={{
                    cannonBall: { position: [30, windowHeight/2], renderer: <CannonBall /> },
                    powerMeter: { powerLevel: 0, renderer: <PowerMeter /> },
                    // angleMeter: { angleLevel: 45, renderer: <CannonBall /> }


                }}>

                {/* onEvent={(event) => console.log('event in game engine', event)}

                entities={cannonBallArray.reduce((acc, entity) => {
                    acc[entity.id] = { position: entity.position, renderer: entity.renderer };
                    return acc;
                }, {})}> */}

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
