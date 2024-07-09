import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import TNT from "../../../../Components/GameEngine/TNT";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";
import krakenLevelThree from "../../../../systems/krakenMovementSystems/krakenLevelThree";
import Hinderance from "../../../../Components/GameEngine/Hinderance";

function ChatperFourLevelThree() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Kraken',
        nextLevel: 'Kraken/Level4'
    });

    return (
        <ImageBackground
            source={require('../../../../assets/images/basics/level1.png')}
            style={styles.backgroundImg}
        >
            <GameEngineWrapper
                systems=
                {[
                    cannonControlSystem,
                    TNTDetectionSystem,
                    scoreCalculatorSystem,
                    fireCannonSystem,
                    createDetectHinderanceSystem,
                    krakenLevelThree
                ]}
                entities={{
                    cannon: {
                        position: [40, 43],
                        upperTravelLimit: 45,
                    },
                    TNT: {
                        position: [50, screenHeight - 200],
                        display: 'block',
                        handlePosition: [-22, 0],
                        renderer: <TNT />
                    },
                    // This is the cannon Base
                    longHindOne: {
                        position: [0, 120],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    longHindTwo: {
                        position: [screenWidth - 270, 200],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    squareHindOne: {
                        position: [screenWidth - 500, 300],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    },
                    extraLongHindOne: {
                        position: [-5, -15],
                        width: screenWidth + 10,
                        height: 30,
                        renderer: <Hinderance />
                    },
                }}
                endGameData={endGameData}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}
            >
                <StatusBar hidden={true} />
                <BackArrow
                    route={'/LevelLobbyScreen'}
                    params={{ mapName: 'Kraken' }}
                />
                <GameLevelInfoHeader
                    mapName={'Kraken'}
                    levelNumber={3}
                />
            </GameEngineWrapper>
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
    }
});


export default ChatperFourLevelThree;
