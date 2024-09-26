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
import Hinderance from "../../../../Components/GameEngine/Hinderance";

function ChatperThreeLevelOne() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameOverNoDelay, setIsGameOverNoDelay] = useState(false);

    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [1000, 2500, 5000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Hinderance',
        nextLevel: 'Hinderance/Level2'
    });

    const TNTxPos = Math.floor(screenWidth / 1.5);
    const TNTyPos = 200;
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
                ]}
                entities={{
                    cannon: {
                        position: [100, screenHeight - 325],
                        upperTravelLimit: 120,
                    },
                    cannonPlatform: {
                        position: [0, screenHeight - 250],
                        width: 200,
                        height: 20,
                        renderer: <Hinderance />

                    },
                    TNT: {
                        position: [TNTxPos, TNTyPos],
                        display: 'block',
                        handlePosition: [-17, 0],
                        renderer: <TNT />
                    },
                    TNTRoofHinderance: {
                        position: [TNTxPos - 50, TNTyPos - 100],
                        width: 200,
                        height: 20,
                        renderer: <Hinderance />
                    },
                    sideHinderance: {
                        position: [TNTxPos - 70, TNTyPos - 70],
                        width: 20,
                        height: 80,
                        renderer: <Hinderance />
                    },
                    bottomHinderance: {
                        position: [TNTxPos - 100, TNTyPos + 70],
                        width: 200,
                        height: 20,
                        renderer: <Hinderance />
                    },
                    rightSideHelperHinderance: {
                        position: [TNTxPos + 100, TNTyPos + 10],
                        width: 100,
                        height: 20,
                        renderer: <Hinderance />
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
                        params={{ mapName: 'Hinderance' }}
                    />
                }
                <GameLevelInfoHeader
                    mapName={'Hinderance'}
                    levelNumber={1}
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


export default ChatperThreeLevelOne;
