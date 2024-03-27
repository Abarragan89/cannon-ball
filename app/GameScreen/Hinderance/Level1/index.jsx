import { useRef, useState, useContext } from "react";
import { GameEngine } from "react-native-game-engine"
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
import FollowArrow from "../../../../Components/GameEngine/FollowArrow";
import scoreCalculatorSystem from "../../../../systems/scoreCalculatorSystem";
import { Dimensions } from 'react-native'
import EndGameModal from "../../../../Components/GameEngine/EndGameModal";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import BackArrow from "../../../../Components/UI/BackArrow";
import LongHind from "../../../../Components/GameEngine/Hinderances/LongHind";
import longHindSystemOne from "../../../../systems/hinderanceDetection/longHindSystemOne";
import longHindSystemTwo from "../../../../systems/hinderanceDetection/longHindSystemTwo";
import { SoundContext } from "../../../../store/soundsContext";


function ChatperThreeLevelOne() {
    // Load sounds from context API, make gameEngineRef, and gameOver State
    const { sounds: gameSoundContext } = useContext(SoundContext);
    const gameEngineRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);


    // Angle Data
    const angleLevelRef = useRef(90)
    // Power Data
    const powerLevelRef = useRef(15)

    const endGameData = useRef({
        accuracyFloat: 0,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        nextLevel: 'Hinderance/Level2'
    })


    return (
        <ImageBackground
            source={require('../../../../assets/images/basics/level1.png')}
            style={styles.backgroundImg}
        >
                <GameEngine
                    ref={gameEngineRef}
                    style={styles.container}
                    systems=
                    {[
                        cannonControlSystem,
                        TNTDetectionSystem,
                        scoreCalculatorSystem,
                        fireCannonSystem,
                        longHindSystemOne,
                        longHindSystemTwo
                    ]}
                    entities={{
                        cannonBall: {
                            position: [-100, 0],
                            gradientColor: 'rgba(0, 0, 0, .75)',
                            color: 'rgba(0, 0, 0, 1)',
                            velocity: [1, 1],
                            display: 'block',
                            accuracy: { name: '', float: 0, multiplier: 0 },
                            isGameOver: isGameOver,
                            setIsGameOver: setIsGameOver,
                            isBallMoving: false,
                            renderer: <CannonBall />
                        },
                        gameData: {
                            endGameData: endGameData,
                            isGameOver: isGameOver,
                            setIsGameOver: setIsGameOver,
                            bounceLevel: 0.8
                        },
                        sounds: {
                            shootCannonSound: gameSoundContext?.current?.shootCannonSound,
                            tntExplosionSound: gameSoundContext?.current?.tntExplosionSound,
                            tntHandleClickSound: gameSoundContext?.current?.tntHandleClickSound,
                            fireworkSound: gameSoundContext?.current?.fireworkSound,
                            cannonBallBounceSound: gameSoundContext?.current?.cannonBallBounceSound,
                            tntCannonBallHitSound: gameSoundContext?.current?.tntCannonBallHitSound,
                            cannonBallHitSandSound: gameSoundContext?.current?.cannonBallHitSandSound,
                            backgroundWaveSound: gameSoundContext?.current?.backgroundWaveSound
                        },
                        cannon: {
                            position: [400, screenHeight - 100],
                            rotate: '-90deg',
                            renderer: <CannonLauncher />
                        },
                        TNT: {
                            position: [screenWidth - 100, 100],
                            display: 'block',
                            handlePosition: [-13, 0],
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
                        longHindOne: {
                            position: [screenWidth - 210, 60],
                            renderer: <LongHind />
                        },
                        longHindTwo: {
                            position: [screenWidth - 120, 160],
                            renderer: <LongHind />
                        },
                        fireBtn: {
                            isShooting: false,
                            renderer: <FireBtn />
                        }
                    }}>
                    <StatusBar hidden={true} />
                    <BackArrow
                        route={'/LevelLobbyScreen'}
                        params={{ mapName: 'Hinderance' }}
                    />

                    {isGameOver &&
                        <EndGameModal
                            endGameData={endGameData}
                        />
                    }
                </GameEngine>
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


export default ChatperThreeLevelOne;
