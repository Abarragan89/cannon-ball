import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";
import HatchBtnBottom from '../../../../Components/GameEngine/HatchButtons/HatchBtnBottom'
import hatchBtnDetectionSystem from "../../../../systems/hatchDetectionSystems/hatchBtnDetection";
import hitHatchBtn_OpenHatchSystem from "../../../../systems/hatchDetectionSystems/hitHatchBtn_OpenHatchSystem";
import levelThreeHatchSystem from "../../../../systems/hatchDetectionSystems/hatchLevelSystems/levelThree";
import colors from "../../../../constants/colors";
import TNT from "../../../../Components/GameEngine/TNT";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";
import Hinderance from "../../../../Components/GameEngine/Hinderance";

function ChapterFiveLevelThree() {
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
        nextLevel: 'Hatch/Level4'
    });

    const TNTxPos = screenWidth - 100
    const TNTyPos = screenHeight - 120

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
                    levelThreeHatchSystem,
                ]}
                entities={{
                    cannon: {
                        position: [100, screenHeight - 100],
                        upperTravelLimit: 220,
                    },
                    hatchBtn: {
                        isHit: false,
                        topPosition: 33,
                        color: colors.bronzeStar,
                        isTriggerOnBottom: true,
                        position: [350, 20],
                        renderer: <HatchBtnBottom />
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
                    squareHindOne: {
                        position: [300, screenHeight - 50],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    },
                    squareHindTwo: {
                        position: [420, screenHeight - 50],
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
                        params={{ mapName: 'Hatch' }}
                    />
                }
                <GameLevelInfoHeader
                    mapName={'Hatch'}
                    levelNumber={3}
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


export default ChapterFiveLevelThree;
