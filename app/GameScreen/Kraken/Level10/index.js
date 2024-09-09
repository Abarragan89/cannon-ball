import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground, Dimensions } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import TNT from "../../../../Components/GameEngine/TNT";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";
import krakenLevelTenSystems from "../../../../systems/krakenMovementSystems/krakenLevelTen";
import Hinderance from "../../../../Components/GameEngine/Hinderance";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";

function ChapterFourLevelTen() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Kraken',
        nextLevel: 'Kraken/Level10'
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
                    krakenLevelTenSystems
                ]}
                entities={{
                    cannonMovementCount: {
                        cannonLauncher: 0
                    },
                    cannon: {
                        position: [Math.floor(screenWidth / 2) - 60, 150],
                        upperTravelLimit: -1,
                        lowerTravelLimit: 1000
                    },
                    TNT: {
                        position: [Math.floor(screenWidth / 2) - 43, screenHeight - 100],
                        display: 'block',
                        handlePosition: [-22, 0],
                        renderer: <TNT />
                    },
                    cannonStand: {
                        position: [Math.floor(screenWidth / 2) - 63, 225],
                        height: 15,
                        width: 70,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
                    leftHinderOne: {
                        position: [50, screenHeight - 150],
                        width: 20,
                        height: 150,
                        renderer: <Hinderance />
                    },
                    leftHinderTwo: {
                        position: [150, 150],
                        width: 20,
                        height: 150,
                        renderer: <Hinderance />
                    },
                    leftHinderThree: {
                        position: [250, 0],
                        width: 20,
                        height: 150,
                        renderer: <Hinderance />
                    },
                    // right side of moving hinderances
                    rightHinderOne: {
                        position: [screenWidth - 50, screenHeight - 150],
                        width: 20,
                        height: 150,
                        renderer: <Hinderance />
                    },
                    rightHinderTwo: {
                        position: [screenWidth - 150, 150],
                        width: 20,
                        height: 150,
                        renderer: <Hinderance />
                    },
                    rightHinderThree: {
                        position: [screenWidth - 250, 0],
                        width: 20,
                        height: 150,
                        renderer: <Hinderance />
                    }
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

export default ChapterFourLevelTen;

