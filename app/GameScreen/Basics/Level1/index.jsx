import { useRef, useState, useEffect } from "react";
import { useLocalSearchParams } from 'expo-router';
import { GameEngine } from "react-native-game-engine";
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
import EndGameModal from "../../../../Components/GameEngine/EndGameModal";
const screenHeight = Dimensions.get('window').height;
import BackArrow from "../../../../Components/UI/BackArrow";
import { getIndividualLevelData } from "../../../../utils/db/selectQueries";
import {
    updateLevelToPass,
    updateLevelHighScore,
    updateLevelAccuracy,
    updateUserTotalPoints,
    updateLevelEarnedStars
} from "../../../../utils/db/updateQueries";
import { Audio } from 'expo-av';


// import followCannonBallOnMove from "../../../../systems/followCannonBallOnMove";

function ChatperOneLevelOne() {
    // Grab the level Id 
    const {
        levelId,
        lastAccuracy,
        lastHighscore,
        lastEarnedStars,
        isSoundOn,
        isSoundEffectsOn,
        isHapticsOn
    } = useLocalSearchParams();

    const gameEngineRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [playBgMusic, setPlayBgMusic] = useState(true)
    const [isSoundLoaded, setIsSoundLoaded] = useState(false)

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

    const sounds = useRef({
        shootCannonSound: null,
        tntCannonBallHitSound: null,
        backgroundMusicSound: null,
        tntExplosionSound: null,
        tntHandleClickSound: null,
        cannonBallBounceSound: null,
        cannonBallHitSandSound: null,
        backgroundWaveSound: null
    });

    // Play background noises and stop them when game is over
    useEffect(() => {
        async function stopMusic() {
            try {
                await sounds.current.backgroundMusicSound.setIsLoopingAsync(false);
                await sounds.current.backgroundWaveSound.setIsLoopingAsync(false);
                await sounds.current.backgroundMusicSound.stopAsync();
                await sounds.current.backgroundWaveSound.stopAsync();
            } catch (error) {
                console.log('error stopping music in useEffect ', error)
            }
        }
        async function startMusic() {
            try {
                await sounds.current.backgroundMusicSound.setIsLoopingAsync(true);
                await sounds.current.backgroundMusicSound.playAsync();
                await sounds.current.backgroundWaveSound.setIsLoopingAsync(true);
                await sounds.current.backgroundWaveSound.playAsync();
            } catch (error) {
                console.log('error starting music ', error);
            }
        }
        // start music if state is available and user preferences have soundOn
        if (playBgMusic && isSoundLoaded && isSoundOn > 0) startMusic();
        if (!playBgMusic && isSoundOn) stopMusic()
    }, [playBgMusic, isSoundLoaded, isSoundOn]);


    // download all the sounds
    useEffect(() => {
        const loadSound = async () => {
            try {
                //  DOWNLOAD ALL AUDIO FILES
                const { sound: shootCannonSound } = await Audio.Sound.createAsync(require('../../../../assets/sounds/cannonShot.mp3'));
                const { sound: tntExplosionSound } = await Audio.Sound.createAsync(require('../../../../assets/sounds/hugeExplosion.wav'));
                const { sound: backgroundMusicSound } = await Audio.Sound.createAsync(require('../../../../assets/sounds/backgroundMusic.mp3'), {
                    volume: 0.1
                });
                const { sound: tntHandleClickSound } = await Audio.Sound.createAsync(require('../../../../assets/sounds/tntHandleClick.wav'));
                const { sound: cannonBallBounceSound } = await Audio.Sound.createAsync(require('../../../../assets/sounds/cannonBallBounce.wav'));
                const { sound: tntCannonBallHitSound } = await Audio.Sound.createAsync(require('../../../../assets/sounds/woodHit.wav'));
                const { sound: cannonBallHitSandSound } = await Audio.Sound.createAsync(require('../../../../assets/sounds/cannonBallHitsBottom.wav'));
                const { sound: backgroundWaveSound } = await Audio.Sound.createAsync(require('../../../../assets/sounds/backgroundWaves.wav'), {
                    volume: 0.1
                });
                // SET AUDIO FILES IN REF VARIABLES
                sounds.current = {
                    shootCannonSound,
                    tntCannonBallHitSound,
                    tntExplosionSound,
                    backgroundMusicSound,
                    tntHandleClickSound,
                    cannonBallBounceSound,
                    cannonBallHitSandSound,
                    backgroundWaveSound
                }
                setIsSoundLoaded(true)
            } catch (e) {
                console.log('ERROR LOADING IMAGES AND AUDIO FILES ', e)
            }
        }
        loadSound();

        return () => {
            sounds.current.shootCannonSound.unloadAsync();
            sounds.current.tntCannonBallHitSound.unloadAsync();
            sounds.current.tntExplosionSound.unloadAsync();
            sounds.current.backgroundMusicSound.unloadAsync();
            sounds.current.backgroundWaveSound.unloadAsync();
            sounds.current.tntCannonBallHitSound.unloadAsync();
            sounds.current.cannonBallBounceSound.unloadAsync();
            sounds.current.cannonBallHitSandSound.unloadAsync();
            sounds.current.tntHandleClickSound.unloadAsync();
        }
    }, [])



    // Backend updates 
    useEffect(() => {
        // 'isGameOver' should more appropriately be named 'gameWon'
        if (isGameOver) {
            // get highscore, accuracy, and earnedStars amount after user wins
            const currentHighScore = endGameData.current.multiplier * (endGameData.current.airTime + endGameData.current.bounces)
            const currentAccuracy = endGameData.current.accuracyFloat;
            let currentEarnedStars = 0
            // determine earned stars
            if (currentHighScore >= endGameData.current.winningScore[2]) {
                currentEarnedStars = 3;
            } else if (currentHighScore >= endGameData.current.winningScore[1]) {
                currentEarnedStars = 2;
            } else if (currentHighScore >= endGameData.current.winningScore[0]) {
                currentEarnedStars = 1;
            } else {
                currentEarnedStars = 0;
            }
            async function updateLevelData() {
                // Update level to passed if not already passed
                await updateLevelToPass(levelId)
                // Update users highscore
                await updateUserTotalPoints(currentHighScore)
                // Compare the highscore to the old highscore
                if (currentHighScore > +lastHighscore) {
                    await updateLevelHighScore(levelId, currentHighScore)
                }
                // Compare the accuracy with old accuracy
                if (currentAccuracy < +lastAccuracy) {
                    await updateLevelAccuracy(levelId, currentAccuracy)
                }
                // Compare earnedStars
                if (currentEarnedStars > +lastEarnedStars) {
                    await updateLevelEarnedStars(levelId, currentEarnedStars)
                }
            }
            updateLevelData();
        }
    }, [isGameOver, endGameData.current]);

    const [nextLevelData, setNextLevelData] = useState(null);

    // Get next level information to pass as params in the 
    // next level button in the end of game modal
    useEffect(() => {
        async function getNextLevelData() {
            const mapName = endGameData.current.nextLevel.split('/')[0];
            const link = endGameData.current.nextLevel.split('/')[1];
            const nextLevel = await getIndividualLevelData(mapName, link)
            setNextLevelData(nextLevel[0])
        }
        getNextLevelData();
    }, [])


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
            { isSoundLoaded &&
                <GameEngine
                    ref={gameEngineRef}
                    style={styles.container}
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
                            setPlayBgMusic: setPlayBgMusic,
                            isGameOver: false,
                            setIsGameOver: setIsGameOver,
                        },
                        sounds: {
                            shootCannonSound: sounds.current.shootCannonSound,
                            tntExplosionSound: sounds.current.tntExplosionSound,
                            tntHandleClickSound: sounds.current.tntHandleClickSound,
                            backgrounMusicSound: sounds.current.backgroundMusicSound,
                            fireworkSound: sounds.current.fireworkSound,
                            cannonBallBounceSound: sounds.current.cannonBallBounceSound,
                            tntCannonBallHitSound: sounds.current.tntCannonBallHitSound,
                            cannonBallHitSandSound: sounds.current.cannonBallHitSandSound,
                            backgroundWaveSound: sounds.current.backgroundWaveSound,
                            isSoundEffectsOn: isSoundEffectsOn
                        },
                        cannon: {
                            position: [400, screenHeight - 100],
                            rotate: '-90deg',

                            renderer: <CannonLauncher />
                        },
                        TNT: {
                            position: [250, 100],
                            display: 'block',
                            handlePosition: [-20, 0],
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

                    <GameLevelInfoHeader
                        mapName={'Basics'}
                        levelNumber={1}
                    />

                    {isGameOver && nextLevelData &&
                        <EndGameModal
                            endGameData={endGameData}
                            nextLevelData={nextLevelData}
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
