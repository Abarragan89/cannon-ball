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
import BackArrow from "../../../../Components/UI/BackArrow";
import { Audio } from 'expo-av';
import { SoundContext, SoundProvider } from "../../../../store/soundsContext";


function ChatperOneLevelOne() {
    // Load sounds from context API
    const { sounds: gameSoundContext } = useContext(SoundContext);
    // console.log('sounds ', gameSoundContext?.shootCannonSound)


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
        nextLevel: 'Basics/Level2'
    })


    // ///////////////////// CREATE SOUNDS /////////////////////
    // const [shootCannonSound, setShootCannonSound] = useState();
    // const [fireworkSound, setFireworkSound] = useState();
    // const [tntExplosionSound, setTntExplosionSound] = useState();
    // const [tntHandleClickSound, setTntHandleClickSound] = useState();
    // const [cannonBallBounceSound, setCannonBallBounceSound] = useState();
    // const [tntCannonBallHitSound, setTntCannonBallHitSound] = useState();
    // const [cannonBallHitSandSound, setCannonBallHitSandSound] = useState();
    // const [backgroundWaveSound, setBackgroundWaveSound] = useState();
    // const [isAudioLoaded, setIsAudioLoaded] = useState(false);

    // useEffect(() => {
    //     // import sounds and save in state
    //     async function loadAudio() {
    //         try {
    //             console.log(' in the audio loading function ');
    //             const { sound: cannonShot } = await Audio.Sound.createAsync(require('../../../../assets/sounds/cannonShot.mp3'));
    //             console.log(' loaded the first sound (1)');
    //             const { sound: explosion } = await Audio.Sound.createAsync(require('../../../../assets/sounds/hugeExplosion.wav'));
    //             console.log(' loaded the second sound (2)');
    //             const { sound: fireworks } = await Audio.Sound.createAsync(require('../../../../assets/sounds/fireworks.wav'));
    //             console.log(' loaded the third sound (3)');
    //             const { sound: tntHandleClick } = await Audio.Sound.createAsync(require('../../../../assets/sounds/tntHandleClick.wav'));
    //             console.log(' loaded the fourth sound (4)');
    //             const { sound: cannonBallBounce } = await Audio.Sound.createAsync(require('../../../../assets/sounds/cannonBallBounce.wav'));
    //             console.log(' loaded the fifth sound (5)');
    //             const { sound: tntCannonBallHit } = await Audio.Sound.createAsync(require('../../../../assets/sounds/woodHit.wav'));
    //             console.log(' loaded the sixth sound (6)');
    //             const { sound: cannonBallHitSand } = await Audio.Sound.createAsync(require('../../../../assets/sounds/cannonBallHitsBottom.wav'));
    //             console.log(' loaded the seventh sound (7)');
    //             const { sound: backgroundWaves } = await Audio.Sound.createAsync(require('../../../../assets/sounds/backgroundWaves.wav'), {
    //                 isLooping: true,
    //                 volume: 0.15
    //             });
    //             console.log(' loaded the seventh sound (7)');

    //             setShootCannonSound(cannonShot);
    //             setTntExplosionSound(explosion);
    //             setFireworkSound(fireworks);
    //             setTntHandleClickSound(tntHandleClick);
    //             setCannonBallBounceSound(cannonBallBounce);
    //             setTntCannonBallHitSound(tntCannonBallHit);
    //             setCannonBallHitSandSound(cannonBallHitSand);
    //             setBackgroundWaveSound(backgroundWaves)
    //             setIsAudioLoaded(prev => !prev);

    //         } catch (e) {
    //             console.log('error loading music', e)
    //         }
    //     }

    //     loadAudio();
    //     // unload sounds when unmounted
    //     return () => {
    //         if (shootCannonSound) shootCannonSound.unloadAsync();
    //         if (fireworkSound) fireworkSound.unloadAsync();
    //         if (tntExplosionSound) tntExplosionSound.unloadAsync();
    //         if (tntHandleClickSound) tntHandleClickSound.unloadAsync();
    //         if (cannonBallBounceSound) cannonBallBounceSound.unloadAsync();
    //         if (tntCannonBallHitSound) tntCannonBallHitSound.unloadAsync();
    //         if (cannonBallHitSandSound) cannonBallHitSandSound.unloadAsync();
    //         if (backgroundWaveSound) backgroundWaveSound.unloadAsync();
    //     }
    // }, [])

    return (
        <ImageBackground
            source={require('../../../../assets/images/basics/level1.png')}
            style={styles.backgroundImg}
        >
            {
                <GameEngine
                    ref={gameEngineRef}
                    style={styles.container}
                    systems=
                    {[
                        cannonControlSystem,
                        TNTDetectionSystem,
                        scoreCalculatorSystem,
                        fireCannonSystem,
                    ]}
                    entities={{
                        cannonBall: {
                            position: [-100, 0],
                            gradientColor: 'rgba(0, 0, 0, .75)',
                            color: 'rgba(0, 0, 0, 1)',
                            velocity: [1, 1],
                            display: 'block',
                            accuracy: { name: '', float: 0, multiplier: 0 },
                            isBallMoving: false,
                            renderer: <CannonBall />
                        },
                        gameData: {
                            endGameData: endGameData,
                            isGameOver: isGameOver,
                            setIsGameOver: setIsGameOver,
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
                            position: [250, 100],
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
                        fireBtn: {
                            isShooting: false,
                            renderer: <FireBtn />
                        }
                    }}>
                    <StatusBar hidden={true} />
                    <BackArrow
                        route={'/LevelLobbyScreen'}
                        params={{ mapName: 'Basics' }}
                    />

                    {isGameOver &&
                        <EndGameModal
                            endGameData={endGameData}
                        />
                    }
                </GameEngine>
            }
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


export default ChatperOneLevelOne;
