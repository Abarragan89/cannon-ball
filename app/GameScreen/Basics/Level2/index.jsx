import { useRef, useState } from "react";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import TNT from "../../../../Components/GameEngine/TNT";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import BackArrow from "../../../../Components/UI/BackArrow";

function ChatperOneLevelTwo() {

    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 0,
        accuracyName: '',
        winningScore: [100, 2000, 4000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Basics',
        nextLevel: 'Basics/Level3'
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
                ]}
                entities={{
                    cannon: {
                        position: [400, screenHeight - 100],
                    },
                    TNT: {
                        position: [screenWidth - 31, 60],
                        display: 'block',
                        handlePosition: [-15, 0],
                        renderer: <TNT />
                    }
                }}
                endGameData={endGameData}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}
            >
                <StatusBar hidden={true} />
                <BackArrow
                    route={'/LevelLobbyScreen'}
                    params={{ mapName: 'Basics' }}
                />
                <GameLevelInfoHeader
                    mapName={'Basics'}
                    levelNumber={2}
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
    },
});


export default ChatperOneLevelTwo;
