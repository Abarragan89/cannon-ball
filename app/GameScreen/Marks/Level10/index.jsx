import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import moveTNTMarksLevelTen from "../../../../systems/marksMovementSystems/marksLevelTen";
import TNT from "../../../../Components/GameEngine/TNT";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";

function ChatperTwoLevelTen() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameOverNoDelay, setIsGameOverNoDelay] = useState(false);

    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [100, 250, 1000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Marks',
        nextLevel: 'Hinderance/Level1'
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
                    moveTNTMarksLevelTen
                ]}
                entities={{
                    tntMovementCount: {
                        tntPixelCounter: 0,
                        tntPixelCounterLimit: 200,
                        angle: 0,
                        timeStampLastPaused: 0
                    },
                    randomDelayTime: 2000,
                    cannon: {
                        position: [Math.floor(screenWidth / 2) - 30, screenHeight - 100]
                    },
                    TNT: {
                        position: [Math.floor(screenWidth / 2) - 15, 100],
                        initialPosition: [Math.floor(screenWidth / 2) - 15, 100],
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
                        params={{ mapName: 'Marks' }}
                    />
                }
                <GameLevelInfoHeader
                    mapName={'Marks'}
                    levelNumber={10}
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


export default ChatperTwoLevelTen;
