import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import moveTNTMarksLevelTwo from "../../../../systems/marksMovementSystems/marksLevelTwo";
import TNT from "../../../../Components/GameEngine/TNT";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
import BackArrow from "../../../../Components/UI/BackArrow";
import Hinderance from "../../../../Components/GameEngine/Hinderance";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";

function ChatperTwoLevelTwo() {
    const [isGameOverNoDelay, setIsGameOverNoDelay] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [100, 250, 1000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Marks',
        nextLevel: 'Marks/Level3'
    })

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
                    moveTNTMarksLevelTwo,
                    createDetectHinderanceSystem
                ]}
                entities={{
                    cannon: {
                        position: [screenWidth - 80, screenHeight - 351],
                        lowerTravelLimit: screenWidth - 80
                    },
                    cannonPlatform: {
                        position: [screenWidth - 100, screenHeight - 275],
                        width: 100,
                        height: 20,
                        renderer: <Hinderance />
                    },
                    TNT: {
                        position: [150, screenHeight - 150],
                        display: 'block',
                        handlePosition: [-17, 0],
                        renderer: <TNT />
                    }
                }}
                endGameData={endGameData}
                isGameOver={isGameOver}
                setIsGameOverNoDelay={setIsGameOverNoDelay}
                setIsGameOver={setIsGameOver}
            >
                <StatusBar hidden={true} />
                {!isGameOverNoDelay &&
                    <BackArrow
                        route={'/LevelLobbyScreen'}
                        params={{ mapName: 'Marks' }}
                    />
                }
                <GameLevelInfoHeader
                    mapName={'Marks'}
                    levelNumber={2}
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
        right: 0,
    }
});


export default ChatperTwoLevelTwo;