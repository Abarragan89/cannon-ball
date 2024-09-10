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

function ChapterFiveLevelOne() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Hatch',
        nextLevel: 'Hatch/Level3'
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
                    hitHatchBtn_OpenHatchSystem
                ]}
                entities={{
                    cannon: {
                        position: [100, screenHeight - 100],
                    },
                    TNT: {
                        position: [Math.floor(screenWidth / 2), screenHeight - 160],
                        display: 'block',
                        handlePosition: [-15, 0],
                        renderer: <TNT />
                    },
                    hatchBtn: {
                        isHit: false,
                        topPosition: -8,
                        color: colors.bronzeStar,
                        isTriggerOnTop: true,
                        position: [150, 120],
                        renderer: <HatchBtnTop />
                    },
                    hatchLid: {
                        position: [Math.floor(screenWidth / 2) - 14, screenHeight - 188],
                        renderer: <HatchLid />
                    },
                    hatchBox: {
                        position: [Math.floor(screenWidth / 2) - 14, screenHeight - 173],
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
                    levelNumber={1}
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


export default ChapterFiveLevelOne;



