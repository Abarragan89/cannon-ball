import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import TNT from "../../../../Components/GameEngine/TNT";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";
import Hinderance from "../../../../Components/GameEngine/Hinderance";

function ChapterThreeLevelFour() {
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
        nextLevel: 'Hinderance/Level5'
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
                ]}
                entities={{
                    cannon: {
                        position: [screenWidth - 150, screenHeight - 90],
                        lowerTravelLimit: Math.floor(screenWidth / 2) + 75,
                    },
                    TNT: {
                        position: [350, 150],
                        display: 'block',
                        handlePosition: [-17, 0],
                        renderer: <TNT />
                    },
                    giantTallOne: {
                        position: [Math.floor(screenWidth / 2), screenHeight - 315],
                        width: 70,
                        height: 300,
                        renderer: <Hinderance />
                    },
                    longHindOne: {
                        position: [210, 200],
                        width: 120,
                        height: 30,
                        renderer: <Hinderance />
                    },
                    squareHindOne: {
                        position: [345, 60],
                        width: 40,
                        height: 40,
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
                    levelNumber={4}
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


export default ChapterThreeLevelFour;
