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
import hitHatchBtn_OpenHatchSystem from "../../../../systems/hatchDetectionSystems/hitHatchBtn_OpenHatchSystem";
import HatchBtnTop from "../../../../Components/GameEngine/HatchButtons/HatchBtnTop";
import hatchBtnDetectionSystem from "../../../../systems/hatchDetectionSystems/hatchBtnDetection";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";
import levelSixHatchSystem from "../../../../systems/hatchDetectionSystems/hatchLevelSystems/levelSix";
import Hinderance from "../../../../Components/GameEngine/Hinderance";

function ChapterFiveLevelSix() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameOverNoDelay, setIsGameOverNoDelay] = useState(false);

    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Hatch',
        nextLevel: 'Hatch/Level7'
    });

    const TNTxPos = 100;
    const TNTyPos = screenHeight - 100

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
                    hitHatchBtn_OpenHatchSystem,
                    createDetectHinderanceSystem,
                    levelSixHatchSystem
                ]}
                entities={{
                    cannon: {
                        position: [Math.floor(screenWidth / 2), 20],
                        upperTravelLimit: -1,
                        lowerTravelLimit: 1000,
                    },
                    cannonStand: {
                        position: [Math.floor(screenWidth / 2) - 3, 95],
                        height: 15,
                        width: 70,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
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
                    hatchBtn: {
                        position: [screenWidth - 50, Math.floor(screenHeight / 2)],
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
                setIsGameOverNoDelay={setIsGameOverNoDelay}
            >
                <StatusBar hidden={true} />
                {!isGameOverNoDelay &&
                    <BackArrow
                        route={'/LevelLobbyScreen'}
                        params={{ mapName: 'Hatch' }}
                    />
                }
                <GameLevelInfoHeader
                    mapName={'Hatch'}
                    levelNumber={6}
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

export default ChapterFiveLevelSix;