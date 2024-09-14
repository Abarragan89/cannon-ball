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

function ChatperTwoLevelTwo() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [250, 500, 1000],
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
                    moveTNTMarksLevelTwo
                ]}
                entities={{
                    cannon: {
                        position: [screenWidth - 80, screenHeight - 276],
                        lowerTravelLimit: screenWidth - 80
                    },
                    cannonPlatform: {
                        position: [screenWidth - 100, screenHeight - 200],
                        width: 100,
                        height: 200,
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
                setIsGameOver={setIsGameOver}
            >
                <StatusBar hidden={true} />
                <BackArrow
                    route={'/LevelLobbyScreen'}
                    params={{ mapName: 'Marks' }}
                />
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
        top: -85,
        bottom: 0,
        left: 0,
        right: 0,
    }
});


export default ChatperTwoLevelTwo;