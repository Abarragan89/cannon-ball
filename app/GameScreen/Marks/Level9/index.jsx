import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import moveTNTMarksLevelNine from "../../../../systems/marksMovementSystems/marksLevelNine";
import TNT from "../../../../Components/GameEngine/TNT";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";

function ChatperTwoLevelNine() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameOverNoDelay, setIsGameOverNoDelay] = useState(false);

    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [250, 500, 1000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Marks',
        nextLevel: 'Marks/Level10'
    });

    return (
        <ImageBackground
            source={require('../../../../assets/images/basics/stuck.png')}
            style={styles.backgroundImg}
        >
            <GameEngineWrapper
                systems=
                {[
                    cannonControlSystem,
                    TNTDetectionSystem,
                    scoreCalculatorSystem,
                    fireCannonSystem,
                    moveTNTMarksLevelNine
                ]}
                entities={{
                    tntPixelCounter: 2.5,
                    timeStampLastPaused: 0,
                    randomDelayTime: 2000,

                    cannon: {
                        position: [Math.floor(screenWidth / 2) - 30, screenHeight - 120],
                        upperTravelLimit: -1,
                        lowerTravelLimit: 1000,
                    },
                    TNT: {
                        position: [screenWidth - 50, 20],
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
                    levelNumber={9}
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


export default ChatperTwoLevelNine;
