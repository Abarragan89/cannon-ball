import { StyleSheet, Dimensions } from "react-native";
import CannonBall from "./CannonBall";
import CannonLauncher from "./CannonLauncher";
import HeaderStats from "./HeaderStats";
import AngleMeter from "./AngleMeter";
import PowerMeter from "./ PowerMeter";
import FireBtn from "./FireBtn";
import FollowArrow from "./FollowArrow";
import Explosion from "./Explosion";
import { useState, useEffect, useRef } from 'react';
import colors from "../../constants/colors";
import { useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';
const screenHeight = Dimensions.get('window').height;
import { getIndividualLevelData } from "../../db/selectQueries";
import EndGameModal from '../../Components/GameEngine/EndGameModal';
import { GameEngine } from "react-native-game-engine";
import {
    updateLevelToPass,
    updateLevelHighScore,
    updateLevelAccuracy,
    updateUserTotalPoints,
    updateLevelEarnedStars
} from "../../db/updateQueries";


const GameEngineWrapper = ({
    children,
    systems,
    entities,
    endGameData,
    isGameOver,
    setIsGameOver,
}) => {

    // Get Router Parameters
    const {
        levelId,
        lastAccuracy,
        lastHighscore,
        lastEarnedStars,
        isSoundOn,
        isSoundEffectsOn,
        isHapticsOn,
        cannonBallColor,
        cannonBallGradientClr,
        cannonBallBounce,
        cannonBallWeight,
        cannonBallSize,
        cannonColor,
        cannonPower
    } = useLocalSearchParams();

    const [playBgMusic, setPlayBgMusic] = useState(true);
    const [newEntities, setNewEntities] = useState(entities);
    const [isSoundLoaded, setIsSoundLoaded] = useState(false);

    // Angle Data
    const angleLevelRef = useRef(90)
    // Power Data
    const powerLevelRef = useRef(30)

    // works with ruby cannonBall
    // const angleLevelRef = useRef(95)
    // // Power Data
    // const powerLevelRef = useRef(56.5)

    const sounds = useRef({
        shootCannonSound: null,
        tntCannonBallHitSound: null,
        backgroundMusicSound: null,
        tntExplosionSound: null,
        tntHandleClickSound: null,
        cannonBallBounceSound: null,
        cannonBallHitSandSound: null,
        backgroundWaveSound: null,
        isSoundEffectsOn: null,
    });

    ///////////// SET UP THE BACKGROUND MUSIC, START IT AND LISTEN FOR GAME TO STOP /////////////
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
        if (!playBgMusic && isSoundOn) stopMusic();

    }, [playBgMusic, isSoundLoaded, isSoundOn]);

    ////////////////// DOWNLOAD ALL GAME SOUNDS AND SAVE THEM IN REF /////////////////
    useEffect(() => {
        const loadSound = async () => {
            try {
                //  DOWNLOAD ALL AUDIO FILES
                const { sound: shootCannonSound } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/cannonShot.mp3'));
                const { sound: tntExplosionSound } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/hugeExplosion.wav'));
                const { sound: tntHandleClickSound } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/tntHandleClick.wav'));
                const { sound: cannonBallBounceSound } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/cannonBallBounce.wav'));
                const { sound: tntCannonBallHitSound } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/woodHit.wav'));
                const { sound: cannonBallHitSandSound } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/cannonBallHitsBottom.wav'));
                const { sound: backgroundMusicSound } = await Audio.Sound.createAsync(require('../../assets/sounds/backgroundMusic.mp3'), { volume: 0.1 });
                const { sound: backgroundWaveSound } = await Audio.Sound.createAsync(require('../../assets/sounds/backgroundWaves.wav'), { volume: 0.1 });

                // SET AUDIO FILES IN REF VARIABLES
                sounds.current = {
                    shootCannonSound,
                    tntCannonBallHitSound,
                    tntExplosionSound,
                    backgroundMusicSound,
                    tntHandleClickSound,
                    cannonBallBounceSound,
                    cannonBallHitSandSound,
                    backgroundWaveSound,
                }

                // add the sounds and game Data
                setNewEntities(prev => ({
                    ...prev,
                    sounds: sounds.current,
                    gameData: {
                        endGameData: endGameData,
                        setPlayBgMusic: setPlayBgMusic,
                        isGameOver: false,
                        setIsGameOver: setIsGameOver,
                        bounceLevel: cannonBallBounce,
                        isSoundEffectsOn: isSoundEffectsOn,
                        isHapticsOn: isHapticsOn,
                    },
                    cannonBall: {
                        position: [-100, 0],
                        velocity: [1, 1],
                        display: 'block',
                        accuracy: { name: '', float: 0, multiplier: 0 },
                        isBallMoving: false,
                        cannonBallRadius: cannonBallSize,
                        cannonBallWeight: cannonBallWeight,
                        color: cannonBallColor,
                        gradientColor: cannonBallGradientClr,
                        renderer: <CannonBall />
                    },
                    explosion: {
                        position: [0, 0],
                        ballPosition: [0, 0],
                        startAnimation: false,
                        ballColor: cannonBallColor,
                        renderer: <Explosion />
                    },
                    cannon: {
                        ...prev.cannon,
                        rotate: '-90deg',
                        tipColor: colors[cannonColor].tip,
                        barrelColor: colors[cannonColor].barrel,
                        cannonBaseColor: colors[cannonColor].cannonBase,
                        cannonBallBolt: colors[cannonColor].cannonBallBolt,
                        cannonBallBoltHighlight: colors[cannonColor].cannonBallBoltHighlight,
                        wheelColor: colors[cannonColor].wheelColor,
                        wheelColorHighlight: colors[cannonColor].wheelColorHighlight,
                        cannonPower: cannonPower,
                        renderer: <CannonLauncher />
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
                }));
                setIsSoundLoaded(true)
            } catch (e) {
                console.log('error downloading  music files  ', e)
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
    }, []);

    //////////// BACKEND UPDATE /////////////////////
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
                // Update users highscore
                await updateUserTotalPoints(currentHighScore)
                // Update level to passed if not already passed
                await updateLevelToPass(levelId)
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
    }, [isGameOver, endGameData.current])


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


    return (
        <>
            {isSoundLoaded &&
                <GameEngine
                    style={styles.container}
                    systems={systems}
                    entities={newEntities}
                >
                    {isGameOver && nextLevelData &&
                        <EndGameModal
                            endGameData={endGameData}
                            nextLevelData={levelId === '5' ? null : nextLevelData}
                            cannonBallColor={cannonBallColor}
                            cannonBallGradientClr={cannonBallGradientClr}
                            cannonBallBounce={cannonBallBounce}
                            cannonBallWeight={cannonBallWeight}
                            cannonBallSize={cannonBallSize}
                            isSoundOn={isSoundOn}
                            isSoundEffectsOn={isSoundEffectsOn}
                            isHapticsOn={isHapticsOn}
                            cannonColor={cannonColor}
                            cannonPower={cannonPower}
                        />
                    }
                    {children}
                </GameEngine>
            }
        </>
    )
}

export default GameEngineWrapper;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        height: screenHeight,
        zIndex: 16
    },
})
