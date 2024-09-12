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
import levelSevenHatchSystem from "../../../../systems/hatchDetectionSystems/hatchLevelSystems/levelSeven";
import Hinderance from "../../../../Components/GameEngine/Hinderance";

function ChapterFiveLevelSeven() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Hatch',
        nextLevel: 'Hatch/Level8'
    });


    const TNTxPos= Math.floor(screenWidth / 3) - 136;
    const TNTyPos = screenHeight - 167

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
                    levelSevenHatchSystem
                ]}
                entities={{
                    cannon: {
                        position: [100, screenHeight - 150],
                        upperTravelLimit: Math.floor(screenWidth / 3) - 70,
                    },
                    cannonStand: {
                        position: [97, screenHeight - 75],
                        height: 15,
                        width: 70,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },

                    // The next four are TNT in a hatch.
                    TNT: {
                        position: [TNTxPos, TNTyPos],
                        display: 'block',
                        handlePosition: [-15, 0],
                        renderer: <TNT />
                    },
                    hatchSideOne: {
                        position: [TNTxPos - 15, TNTyPos  - 20],
                        width: 15,
                        height: 50,
                        renderer: <Hinderance />,
                        color: colors.sandColor
                    },
                    hatchSideTwo: {
                        position: [TNTxPos + 30, TNTyPos -20],
                        width: 15,
                        height: 50,
                        renderer: <Hinderance />,
                        color: colors.sandColor
                    },
                    // This HAS to be called hatchLid
                    hatchLid: {
                        position: [TNTxPos - 5, TNTyPos -  35 ],
                        width: 40,
                        height: 15,
                        color: colors.sandColor,
                        renderer: <Hinderance />
                    },
                    giantTallOne: {
                        position: [Math.floor(screenWidth / 3), screenHeight - 200],
                        width: 100,
                        height: 200,
                        renderer: <Hinderance />
                    },
                    hatchBtn: {
                        position: [screenWidth - 50, screenHeight - 150],
                        isHit: false,
                        topPosition: -8,
                        color: colors.bronzeStar,
                        isTriggerOnTop: true,
                        renderer: <HatchBtnTop />
                    },
                    // hatchLid: {
                    //     position: [Math.floor(screenWidth / 3) - 150, screenHeight - 195],
                    //     renderer: <HatchLid />
                    // },
                    // hatchBox: {
                    //     position: [Math.floor(screenWidth / 3) - 150, screenHeight - 180],
                    //     renderer: <HatchBox />
                    // }
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
                    levelNumber={7}
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

export default ChapterFiveLevelSeven;