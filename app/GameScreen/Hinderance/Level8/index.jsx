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
import colors from "../../../../constants/colors";

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
        nextLevel: 'Hinderance/Level9'
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
                        upperTravelLimit: 110,
                    },
                    TNT: {
                        position: [Math.floor((720 - 240) / 2) + 225, screenHeight - 70],
                        display: 'block',
                        handlePosition: [-17, 0],
                        renderer: <TNT />
                    },
                    // Left Border 
                    leftBorder: {
                        position: [190, 20],
                        width: 50,
                        height: screenHeight - 50,
                        renderer: <Hinderance />
                    },
                    // Right Border 
                    rightBorder: {
                        position: [720, 20],
                        width: 50,
                        height: screenHeight - 50,
                        renderer: <Hinderance />
                    },
                    // Row one (starting from left to right)
                    rowOneColumnOne: {
                        position: [250, 50],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnTwo: {
                        position: [300, 50],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnThree: {
                        position: [350, 50],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnFour: {
                        position: [400, 50],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnFive: {
                        position: [450, 50],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnSix: {
                        position: [500, 50],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnSeven: {
                        position: [550, 50],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnEight: {
                        position: [600, 50],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnNine: {
                        position: [650, 50],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowOneColumnTen: {
                        position: [700, 50],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    // Row Two (from left to right)
                    rwoTwoColumnOne: {
                        position: [275, 100],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnTwo: {
                        position: [325, 100],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnThree: {
                        position: [375, 100],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnFour: {
                        position: [425, 100],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnFive: {
                        position: [475, 100],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnSix: {
                        position: [525, 100],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnSeven: {
                        position: [575, 100],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnEight: {
                        position: [625, 100],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rwoTwoColumnNine: {
                        position: [675, 100],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    // Row Three (starting from left to right)
                    rowThreeColumnOne: {
                        position: [250, 150],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnTwo: {
                        position: [300, 150],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnThree: {
                        position: [350, 150],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnFour: {
                        position: [400, 150],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnFive: {
                        position: [450, 150],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnSix: {
                        position: [500, 150],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnSeven: {
                        position: [550, 150],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnEight: {
                        position: [600, 150],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnNine: {
                        position: [650, 150],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowThreeColumnTen: {
                        position: [700, 150],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    // Row Four (from left to right)
                    rowFourColumnOne: {
                        position: [275, 200],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnTwo: {
                        position: [325, 200],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnThree: {
                        position: [375, 200],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnFour: {
                        position: [425, 200],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnFive: {
                        position: [475, 200],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnSix: {
                        position: [525, 200],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnSeven: {
                        position: [575, 200],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnEight: {
                        position: [625, 200],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFourColumnNine: {
                        position: [675, 200],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    // Row Three (starting from left to right)
                    rowFiveColumnOne: {
                        position: [250, 250],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnTwo: {
                        position: [300, 250],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnThree: {
                        position: [350, 250],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnFour: {
                        position: [400, 250],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnFive: {
                        position: [450, 250],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnSix: {
                        position: [500, 250],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnSeven: {
                        position: [550, 250],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnEight: {
                        position: [600, 250],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnNine: {
                        position: [650, 250],
                        color: colors.sandColor,
                        width: 10,
                        height: 10,
                        renderer: <Hinderance />
                    },
                    rowFiveColumnTen: {
                        position: [700, 250],
                        color: colors.sandColor,
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
                    levelNumber={8}
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
