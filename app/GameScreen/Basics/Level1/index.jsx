import { useEffect, useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import TNT from "../../../../Components/GameEngine/TNT";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import BackArrow from "../../../../Components/UI/BackArrow";
import { Dimensions } from "react-native";
import GameTutorial from "../../../../Components/GameEngine/GameTutorial";
const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
import { getHasSeenTutorial } from "../../../../db/selectQueries";
import Hinderance from "../../../../Components/GameEngine/Hinderance";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";
import followCannonBallOnMove from "../../../../systems/followCannonBallOnMove";

function ChatperOneLevelOne() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameOverNoDelay, setIsGameOverNoDelay] = useState(false);
    const [tutorialStep, setTutorialStep] = useState(0);
    const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
    const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);

    function increaseTutorialStep() {
        setTutorialStep(prev => prev + 1)
    }

    async function getTutorialStatus() {
        try {
            // double destructuring
            const [{ hasSeenTutorial }] = await getHasSeenTutorial(1);
            setHasSeenTutorial(hasSeenTutorial);
            setIsSettingsLoaded(true);
        } catch (error) {
            console.log('error getting tutorial status', error)
        }
    }

    useEffect(() => {
        getTutorialStatus();
    }, [])

    const endGameData = useRef({
        // start with impossible accuracy float to compare on first win
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [100, 250, 1000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Basics',
        nextLevel: 'Basics/Level2'
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
                    createDetectHinderanceSystem
                    // followCannonBallOnMove
                ]}
                entities={{
                    cannon: {
                        position: [screenWidth - 130, screenHeight - 326],
                        lowerTravelLimit: screenWidth - 130
                    },
                    cannonPlatform: {
                        position: [screenWidth - 150, screenHeight - 250],
                        width: 150,
                        height: 20,
                        renderer: <Hinderance />
                    },
                    TNT: {
                        position: [200, 200],
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
                    levelNumber={1}
                />

                {tutorialStep < 4 && !hasSeenTutorial && isSettingsLoaded &&
                    <GameTutorial
                        tutorialStep={tutorialStep}
                        increaseTutorialStep={increaseTutorialStep}
                    />
                }
            </GameEngineWrapper>
        </ImageBackground >
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

export default ChatperOneLevelOne;
