
import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import TNT from "../../../../Components/GameEngine/TNT";
import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import BackArrow from "../../../../Components/UI/BackArrow";

function ChatperOneLevelThree() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameOverNoDelay, setIsGameOverNoDelay] = useState(false);


    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [100, 250, 1500],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Basics',
        nextLevel: 'Basics/Level4'
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
                        position: [200, -5],
                        display: 'block',
                        handlePosition: [-17, 0],
                        renderer: <TNT />
                    }
                }}
                endGameData={endGameData}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}
                setIsGameOverNoDelay={setIsGameOverNoDelay}
            >
                <StatusBar hidden={true} />
                {!isGameOverNoDelay &&
                    <BackArrow
                        route={'/LevelLobbyScreen'}
                        params={{ mapName: 'Basics' }}
                    />
                }
                <GameLevelInfoHeader
                    mapName={'Basics'}
                    levelNumber={3}
                />
            </GameEngineWrapper>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImg: {
        position: 'absolute',
        top: -5,
        bottom: 0,
        left: 0,
        right: 0
    }
});


export default ChatperOneLevelThree;
