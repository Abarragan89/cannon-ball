import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import CannonBall from "../../../../Components/GameEngine/CannonBall";
import PowerMeter from "../../../../Components/GameEngine/ PowerMeter";
import CannonLauncher from "../../../../Components/GameEngine/CannonLauncher";
import AngleMeter from "../../../../Components/GameEngine/AngleMeter";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import HeaderStats from "../../../../Components/GameEngine/HeaderStats";
import FireBtn from "../../../../Components/GameEngine/FireBtn";
import TNT from "../../../../Components/GameEngine/TNT";
import Explosion from "../../../../Components/GameEngine/Explosion";
import FollowArrow from "../../../../Components/GameEngine/FollowArrow";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";
import colors from "../../../../constants/colors";
import hitHatchBtn_OpenHatchSystem from "../../../../systems/hatchDetectionSystems/hitHatchBtn_OpenHatchSystem";
import HatchBtnLeft from "../../../../Components/GameEngine/HatchButtons/HatchBtnLeft";
import hatchBtnDetectionSystem from "../../../../systems/hatchDetectionSystems/hatchBtnDetection";
import HatchLid from "../../../../Components/GameEngine/HatchLid";
import HatchBox from "../../../../Components/GameEngine/HatchBox";
import hatchBoxDetectionSystem from "../../../../systems/hatchDetectionSystems/hatchBox.Detection";
import hatchLidDetectionSystem from "../../../../systems/hatchDetectionSystems/hatchLid.Detection";
import giantTallSystemOne from "../../../../systems/hinderanceDetection/giantTallSystemOne";
import smallSquareSystemOne from "../../../../systems/hinderanceDetection/smallSquareSystemOne";
import levelFourHatchSystem from "../../../../systems/hatchDetectionSystems/hatchLevelSystems/levelFour";
import Hinderance from "../../../../Components/GameEngine/Hinderances/Hinderance";

function ChapterFiveLevelFour() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Hatch',
        nextLevel: 'Hatch/Level5'
    });

    // Angle Data
    const angleLevelRef = useRef(90);
    // Power Data
    const powerLevelRef = useRef(30);

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
                    giantTallSystemOne,
                    smallSquareSystemOne,
                    levelFourHatchSystem
                ]}
                entities={{
                    cannonBall: {
                        position: [-100, 0],
                        velocity: [1, 1],
                        display: 'block',
                        accuracy: { name: '', float: 0, multiplier: 0 },
                        isGameOver: isGameOver,
                        setIsGameOver: setIsGameOver,
                        isBallMoving: false,
                        renderer: <CannonBall />
                    },
                    cannon: {
                        position: [Math.floor(screenWidth / 2), screenHeight - 100],
                        rotate: '-90deg',
                        lowerTravelLimit: Math.floor(screenWidth / 4) + 75,
                        renderer: <CannonLauncher />
                    },
                    TNT: {
                        position: [screenWidth - 336, 193],
                        display: 'block',
                        handlePosition: [-18, 0],
                        renderer: <TNT />
                    },
                    explosion: {
                        position: [0, 0],
                        ballPosition: [0, 0],
                        ballColor: '#000000',
                        startAnimation: false,
                        renderer: <Explosion />
                    },
                    followArrow: {
                        leftPosition: 300,
                        displayStatus: 'none',
                        renderer: <FollowArrow />
                    },
                    headerStats: {
                        airTime: 0,
                        bounces: 0,
                        renderer: <HeaderStats />
                    },
                    angleMeter: {
                        angleLevel: angleLevelRef.current,
                        renderer: <AngleMeter />
                    },
                    powerMeter: {
                        displayPower: powerLevelRef.current,
                        renderer: <PowerMeter />
                    },
                    giantTallOne: {
                        position: [Math.floor(screenWidth / 4), screenHeight - 315],
                        width: 70,
                        height: 300,
                        renderer: <Hinderance />
                    },
                    squareHindOne: {
                        position: [60, screenHeight - 55],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    },
                    hatchBtn: {
                        isHit: false,
                        leftPosition: -11,
                        color: colors.bronzeStar,
                        isTriggerOnLeft: true,
                        position: [Math.floor(screenWidth / 4) - 40, screenHeight - 250],
                        renderer: <HatchBtnLeft />
                    },
                    hatchLid: {
                        position: [screenWidth - 350, 165],
                        renderer: <HatchLid />
                    },
                    hatchBox: {
                        position: [screenWidth - 350, 180],
                        renderer: <HatchBox />
                    },
                    fireBtn: {
                        isShooting: false,
                        renderer: <FireBtn />
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
                    levelNumber={4}
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

export default ChapterFiveLevelFour;