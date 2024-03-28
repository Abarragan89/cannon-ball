import { useRef, useState, useEffect, useContext } from "react";
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
import CannonStand from "../../../../Components/GameEngine/Hinderances/CannonStand";
import SmallSquareHind from "../../../../Components/GameEngine/Hinderances/SmallSquareHind";
import smallSquareSystemOne from "../../../../systems/hinderanceDetection/smallSquareSystemOne";
import LongHind from '../../../../Components/GameEngine/Hinderances/LongHind';
import longHindSystemOne from "../../../../systems/hinderanceDetection/longHindSystemOne";
import GiantTallHind from "../../../../Components/GameEngine/Hinderances/GiantTallHind";
import giantTallSystemOne from "../../../../systems/hinderanceDetection/giantTallSystemOne";
import ExtraLongHind from "../../../../Components/GameEngine/Hinderances/ExtraLongHind";
import extraLongHindSystemOne from "../../../../systems/hinderanceDetection/extraLongHindSystemOne";
import krakenLevelFiveSystems from "../../../../systems/krakenMovementSystems/krakenLevelFive";
import cannonStandDetectionSystem from "../../../../systems/hinderanceDetection/cannonStandDetection";
import { SoundContext } from "../../../../store/soundsContext";

function ChapterFourLevelFive() {
    // Load sounds from context API, make gameEngineRef, and gameOver State
    const { sounds: gameSoundContext } = useContext(SoundContext);
    const gameEngineRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [playBgMusic, setPlayBgMusic] = useState(true)

    // Play background noises and stop them when game is over
    useEffect(() => {
        async function stopMusic() {
            await gameSoundContext.current.backgroundMusicSound.setIsLoopingAsync(false);
            await gameSoundContext.current.backgroundWaveSound.setIsLoopingAsync(false);
        }
        async function startMusic() {
            await gameSoundContext.current.backgroundMusicSound.setIsLoopingAsync(true);
            await gameSoundContext.current.backgroundWaveSound.setIsLoopingAsync(true);
            await gameSoundContext.current.backgroundMusicSound.playAsync();
            await gameSoundContext.current.backgroundWaveSound.playAsync();
        }
        if (!playBgMusic) {
            try {
                stopMusic();
            } catch (e) {
                console.log('error stopping music', e)
            }
        } else {
            try {
                startMusic();
            } catch (e) {
                console.log('error starting music', e)
            }
        }
        return () => {
            gameSoundContext.current.backgroundMusicSound.stopAsync();
            gameSoundContext.current.backgroundWaveSound.stopAsync();
        }
    }, [playBgMusic])
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
        nextLevel: 'Hatch/Level1'
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
                    smallSquareSystemOne,
                    longHindSystemOne,
                    giantTallSystemOne,
                    extraLongHindSystemOne,
                    cannonStandDetectionSystem,
                    krakenLevelFiveSystems
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
                        setPlayBgMusic: setPlayBgMusic,
                        isGameOver: false,
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
                        position: [screenWidth - 78, 75],
                        upperTravelLimit: -1,
                        lowerTravelLimit: 1000,
                        rotate: '-90deg',
                        renderer: <CannonLauncher />
                    },
                    TNT: {
                        position: [250, 150],
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
                    extraLongHindOne: {
                        position: [-5, -2],
                        renderer: <ExtraLongHind />
                    },
                    longHindOne: {
                        position: [Math.floor(screenWidth / 2) - 180, screenHeight - 50],
                        renderer: <LongHind />
                    },
                    // this is the square closest to the cannon
                    squareHindOne: {
                        position: [Math.floor(screenWidth / 2), screenHeight - 50],
                        renderer: <SmallSquareHind />
                    },
                    giantTallOne: {
                        position: [Math.floor(screenWidth / 2) + 55, -50],
                        renderer: <GiantTallHind />
                    },
                    cannonStand: {
                        position: [screenWidth - 82, 150],
                        renderer: <CannonStand />
                    },
                    fireBtn: {
                        isShooting: false,
                        renderer: <FireBtn />
                    }

                }}>
                <StatusBar hidden={true} />
                <BackArrow
                    route={'/LevelLobbyScreen'}
                    params={{ mapName: 'Kraken' }}
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


export default ChapterFourLevelFive;
