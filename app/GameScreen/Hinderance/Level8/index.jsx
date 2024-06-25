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

function ChapterThreeLevelEight() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [1000, 2500, 5000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Hinderance',
        nextLevel: 'Kraken/Level1'
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
                        position: [40, screenHeight - 100],
                        upperTravelLimit: Math.floor(screenWidth / 2) - 245,
                    },
                    TNT: {
                        position: [Math.floor(screenWidth / 2) + 20, screenHeight - 70],
                        display: 'block',
                        handlePosition: [-22, 0],
                        renderer: <TNT />
                    },
                    // Row one (starting from left to right)
                    rowOneColumnOne: {
                        position: [250, 100],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnTwo: {
                        position: [300, 100],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnThree: {
                        position: [350, 100],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnFour: {
                        position: [400, 100],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnFive: {
                        position: [450, 100],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnSix: {
                        position: [500, 100],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnSeven: {
                        position: [550, 100],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnEight: {
                        position: [600, 100],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnNine: {
                        position: [650, 100],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnTen: {
                        position: [700, 100],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    // Row Two (from left to right)
                    rwoTwoColumnOne: {
                        position: [275, 150],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnTwo: {
                        position: [325, 150],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnThree: {
                        position: [375, 150],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnFour: {
                        position: [425, 150],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnFive: {
                        position: [475, 150],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnSix: {
                        position: [525, 150],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnSeven: {
                        position: [575, 150],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnEight: {
                        position: [625, 150],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnNine: {
                        position: [675, 150],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    // Row Three (starting from left to right)
                    rowThreeColumnOne: {
                        position: [250, 200],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnTwo: {
                        position: [300, 200],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnThree: {
                        position: [350, 200],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnFour: {
                        position: [400, 200],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnFive: {
                        position: [450, 200],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnSix: {
                        position: [500, 200],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnSeven: {
                        position: [550, 200],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnEight: {
                        position: [600, 200],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnNine: {
                        position: [650, 200],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnTen: {
                        position: [700, 200],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    // Row Four (from left to right)
                    rowFourColumnOne: {
                        position: [275, 250],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnTwo: {
                        position: [325, 250],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnThree: {
                        position: [375, 250],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnFour: {
                        position: [425, 250],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnFive: {
                        position: [475, 250],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnSix: {
                        position: [525, 250],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnSeven: {
                        position: [575, 250],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnEight: {
                        position: [625, 250],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnNine: {
                        position: [675, 250],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    // Row Three (starting from left to right)
                    rowFiveColumnOne: {
                        position: [250, 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnTwo: {
                        position: [300, 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnThree: {
                        position: [350, 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnFour: {
                        position: [400, 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnFive: {
                        position: [450, 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnSix: {
                        position: [500, 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnSeven: {
                        position: [550, 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnEight: {
                        position: [600, 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnNine: {
                        position: [650, 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnTen: {
                        position: [700, 300],
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                }}
                endGameData={endGameData}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}
            >
                <StatusBar hidden={true} />
                <BackArrow
                    route={'/LevelLobbyScreen'}
                    params={{ mapName: 'Hinderance' }}
                />
                <GameLevelInfoHeader
                    mapName={'Hinderance'}
                    levelNumber={5}
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
    container: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        height: screenHeight,
        zIndex: 16
    },
    backIcon: {
        marginTop: 5,
        marginLeft: 5,
        opacity: .7
    },
    imageStyle: {
        flex: 1,
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    }
});


export default ChapterThreeLevelEight;
