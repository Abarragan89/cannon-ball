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
import HatchLid from "../../../../Components/GameEngine/HatchLid";
import HatchBox from "../../../../Components/GameEngine/HatchBox";
import hatchBoxDetectionSystem from "../../../../systems/hatchDetectionSystems/hatchBox.Detection";
import hatchLidDetectionSystem from "../../../../systems/hatchDetectionSystems/hatchLid.Detection";
import createDetectHinderanceSystem from "../../../../systems/createDetectHinderances";
import Hinderance from "../../../../Components/GameEngine/Hinderance";

function ChapterFiveLevelThree() {
    const [isGameOver, setIsGameOver] = useState(false);
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
                    hatchBoxDetectionSystem,
                    hatchLidDetectionSystem,
                    createDetectHinderanceSystem,
                    levelThreeHatchSystem,
                ]}
                entities={{
                    cannon: {
                        position: [100, screenHeight - 100],
                        upperTravelLimit: 220,
                    },
                    TNT: {
                        position: [screenWidth - 100, screenHeight - 120],
                        display: 'block',
                        handlePosition: [-15, 0],
                        renderer: <TNT />
                    },
                    hatchBtn: {
                        isHit: false,
                        topPosition: 33,
                        color: colors.bronzeStar,
                        isTriggerOnBottom: true,
                        position: [350, 20],
                        renderer: <HatchBtnBottom />
                    },
                    hatchLid: {
                        position: [screenWidth - 114, screenHeight - 148],
                        renderer: <HatchLid />
                    },
                    hatchBox: {
                        position: [screenWidth - 114, screenHeight - 133],
                        renderer: <HatchBox />
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
            >
                <StatusBar hidden={true} />
                <BackArrow
                    route={'/LevelLobbyScreen'}
                    params={{ mapName: 'Hatch' }}
                />
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
        top: -85,
        bottom: 0,
        left: 0,
        right: 0
    }
});


export default ChapterFiveLevelThree;
