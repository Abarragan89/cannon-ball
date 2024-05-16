import { useRef, useState } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import CannonBall from "../../../../Components/GameEngine/CannonBall";
import PowerMeter from "../../../../Components/GameEngine/ PowerMeter";
import CannonLauncher from "../../../../Components/GameEngine/CannonLauncher";
import FireBtn from "../../../../Components/GameEngine/FireBtn";
import AngleMeter from "../../../../Components/GameEngine/AngleMeter";
import HeaderStats from "../../../../Components/GameEngine/HeaderStats";
import TNT from "../../../../Components/GameEngine/TNT";
import Explosion from "../../../../Components/GameEngine/Explosion";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
import FollowArrow from "../../../../Components/GameEngine/FollowArrow";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
const screenHeight = Dimensions.get('window').height;
import BackArrow from "../../../../Components/UI/BackArrow";

// import followCannonBallOnMove from "../../../../systems/followCannonBallOnMove";

function ChatperOneLevelOne() {
    const [isGameOver, setIsGameOver] = useState(false);

    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 2000, 4000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Basics',
        nextLevel: 'Basics/Level2'
    });

    // GETS CORNER OF TNT
    // Angle Data
    // const angleLevelRef = useRef(98.34928955)
    // // Power Data
    // const powerLevelRef = useRef(30.3)

    // GET DEAD CENTER OF TNT
    //   // Angle Data
    //   const angleLevelRef = useRef(97.94222)
    //   // Power Data
    //   const powerLevelRef = useRef(31.83)


    // Angle Data
    const angleLevelRef = useRef(90)
    // Power Data
    const powerLevelRef = useRef(15)

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
                    // followCannonBallOnMove
                ]}
                entities={{
                    cannonBall: {
                        position: [-100, 0],
                        velocity: [1, 1],
                        display: 'block',
                        accuracy: { name: '', float: 0, multiplier: 0 },
                        isBallMoving: false,
                        renderer: <CannonBall />
                    },
                    cannon: {
                        position: [400, screenHeight - 100],
                        rotate: '-90deg',
                        renderer: <CannonLauncher />
                    },
                    TNT: {
                        position: [250, 100],
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
                    params={{ mapName: 'Basics' }}
                />
                <GameLevelInfoHeader
                    mapName={'Basics'}
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


export default ChatperOneLevelOne;
