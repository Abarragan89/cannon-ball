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
import HatchLid from "../../../../Components/GameEngine/HatchLid";
import HatchBox from "../../../../Components/GameEngine/HatchBox";
import hatchBoxDetectionSystem from "../../../../systems/hatchDetectionSystems/hatchBox.Detection";
import hatchLidDetectionSystem from "../../../../systems/hatchDetectionSystems/hatchLid.Detection";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";
import levelEightHatchSystem from "../../../../systems/hatchDetectionSystems/hatchLevelSystems/levelEight";
import Hinderance from "../../../../Components/GameEngine/Hinderance";

function ChapterFiveLevelEight() {
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
                    hatchBoxDetectionSystem,
                    hatchLidDetectionSystem,
                    hitHatchBtn_OpenHatchSystem,
                    createDetectHinderanceSystem,
                    levelEightHatchSystem
                ]}
                entities={{
                    cannon: {
                        position: [Math.floor(screenWidth / 3) + 2, screenHeight - 327],
                        upperTravelLimit: -1,
                        lowerTravelLimit: 1000,
                    },
                    TNT: {
                        position: [Math.floor(screenWidth / 3) - 136, screenHeight - 167],
                        display: 'block',
                        handlePosition: [-15, 0],
                        renderer: <TNT />
                    },
                    giantTallOne: {
                        position: [Math.floor(screenWidth / 3), screenHeight - 250],
                        width: 70,
                        height: 300,
                        renderer: <Hinderance />
                    },
                    hatchBtn: {
                        isHit: false,
                        topPosition: -8,
                        color: colors.bronzeStar,
                        isTriggerOnTop: true,
                        position: [screenWidth - 50, screenHeight - 150],
                        renderer: <HatchBtnTop />
                    },
                    hatchLid: {
                        position: [Math.floor(screenWidth / 3) - 150, screenHeight - 195],
                        renderer: <HatchLid />
                    },
                    hatchBox: {
                        position: [Math.floor(screenWidth / 3) - 150, screenHeight - 180],
                        renderer: <HatchBox />
                    }
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

export default ChapterFiveLevelEight;