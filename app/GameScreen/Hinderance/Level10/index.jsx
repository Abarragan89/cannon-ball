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

function ChapterThreeLevelTen() {
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
            source={require('../../../../assets/images/basics/shortInvert.png')}
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
                        position: [screenWidth - 200, screenHeight - 100],
                        // upperTravelLimit: screenWidth - 300,
                        lowerTravelLimit: Math.floor(screenWidth / 2) + 50
                    },
                    TNT: {
                        position: [100, screenHeight - 180],
                        display: 'block',
                        handlePosition: [-15, 0],
                        renderer: <TNT />
                    },
                    TNTRoofHinderance: {
                        position: [30, 50],
                        height: 20,
                        width: 180,
                        renderer: <Hinderance />
                    },
                    sideBlockingHinderance: {
                        position: [225, 75],
                        height: 160,
                        width: 20,
                        renderer: <Hinderance />
                    },
                    // step one is closest to Cannon
                    stepOne: {
                        position: [200, screenHeight - 100],
                        height: 20,
                        width: 100,
                        renderer: <Hinderance />
                    },
                    TNTBaseFloor: {
                        position: [50, screenHeight - 150],
                        height: 20,
                        width: 150,
                        renderer: <Hinderance />
                    },
                    // Barrier blocks
                    smallBlockOne: {
                        position: [380, 0],
                        height: 20,
                        width: 20,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
                    smallBlockTwo: {
                        position: [380, 75],
                        height: 20,
                        width: 20,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
                    smallBlockThree: {
                        position: [380, 150],
                        height: 20,
                        width: 20,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
                    smallBlockFour: {
                        position: [380, 225],
                        height: 20,
                        width: 20,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
                    smallBlockFive: {
                        position: [380, 300],
                        height: 20,
                        width: 20,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
                    smallBlockSix: {
                        position: [380, 375],
                        height: 20,
                        width: 20,
                        color: colors.sandColor,
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


export default ChapterThreeLevelTen;
