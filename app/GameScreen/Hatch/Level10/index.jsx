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
import colors from "../../../../constants/colors";
import doubleHatch_OpenHatchSystem from "../../../../systems/hatchDetectionSystems/doubleHatch_OpenHatchSystem";
import hatchBtnDetectionSystem from "../../../../systems/hatchDetectionSystems/hatchBtnDetection";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";
import levelTenHatchSystem from "../../../../systems/hatchDetectionSystems/hatchLevelSystems/levelTen";
import Hinderance from "../../../../Components/GameEngine/Hinderance";
import HatchBtnTop from "../../../../Components/GameEngine/HatchButtons/HatchBtnTop";

function ChapterFiveLevelTen() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Hatch',
        nextLevel: 'Hatch/Level1'
    });

    const TNTxPos = (screenWidth / 1.35);
    const TNTyPos = screenHeight - 50;

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
                    hatchBtnDetectionSystem,
                    doubleHatch_OpenHatchSystem,
                    createDetectHinderanceSystem,
                    levelTenHatchSystem
                ]}
                entities={{
                    cannon: {
                        position: [60, screenHeight - 278],
                        upperTravelLimit: 80,
                        lowerTravelLimit: 0,
                    },
                    cannonPlatform: {
                        position: [0, screenHeight - 200],
                        width: 150,
                        height: 200,
                        renderer: <Hinderance />
                    },
                    // The next four are TNT in a hatch.
                    TNT: {
                        position: [TNTxPos, TNTyPos],
                        display: 'block',
                        handlePosition: [-17, 0],
                        renderer: <TNT />
                    },
                    hatchSideOne: {
                        position: [TNTxPos - 15, TNTyPos - 20],
                        width: 15,
                        height: 50,
                        renderer: <Hinderance />,
                        color: colors.sandColor
                    },
                    hatchSideTwo: {
                        position: [TNTxPos + 30, TNTyPos - 20],
                        width: 15,
                        height: 50,
                        renderer: <Hinderance />,
                        color: colors.sandColor
                    },
                    // This HAS to be called hatchLid
                    hatchLid: {
                        position: [TNTxPos - 5, TNTyPos - 35],
                        width: 40,
                        height: 15,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
                    hatchBtnOne: {
                        position: [Math.floor(screenWidth / 5), 50],
                        isHit: false,
                        topPosition: -8,
                        color: colors.bronzeStar,
                        isTriggerOnTop: true,
                        renderer: <HatchBtnTop />
                    },
                    hatchBtnTwo: {
                        position: [Math.floor(screenWidth / 2), 150],
                        isHit: false,
                        topPosition: -8,
                        color: colors.bronzeStar,
                        isTriggerOnTop: true,
                        renderer: <HatchBtnTop />
                    },
                }}
                endGameData={endGameData}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}
            >
                <StatusBar hidden={true} />
                <BackArrow
                    route={'/LevelLobbyScreen'}
                    params={{ mapName: 'Hatch' }}
                />
                <GameLevelInfoHeader
                    mapName={'Hatch'}
                    levelNumber={10}
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

export default ChapterFiveLevelTen;