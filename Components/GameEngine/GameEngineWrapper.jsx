import { StyleSheet, Dimensions } from "react-native";
import CannonBall from "./CannonBall";
import CannonLauncher from "./CannonLauncher";
import HeaderStats from "./HeaderStats";
import AngleMeter from "./AngleMeter";
import PowerMeter from "./PowerMeter";
import FireBtn from "./FireBtn";
import FollowArrow from "./FollowArrow";
import Explosion from "./Explosion";
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
    setIsGameOverNoDelay,
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
        cannonPower,
        cannonSound
    } = useLocalSearchParams();

    const [playBgMusic, setPlayBgMusic] = useState(true);
    const [newEntities, setNewEntities] = useState(entities);
    const [isSoundLoaded, setIsSoundLoaded] = useState(false);

    // Angle Data
    const angleLevelRef = useRef(90)
    // Power Data
    const powerLevelRef = useRef(30)

    const sounds = useRef({
        shootCannonSoundL1: null,
        shootCannonSoundL2: null,
        shootCannonSoundL3: null,
        shootCannonSoundL4: null,
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
    useLayoutEffect(() => {
        const loadSoundsAndEntities = async () => {
            try {
                //  DOWNLOAD ALL AUDIO FILES
                const { sound: shootCannonSoundL1 } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/cannonShotL1.mp3'));
                const { sound: shootCannonSoundL2 } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/cannonShotL2.wav'));
                const { sound: shootCannonSoundL3 } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/cannonShotL3.wav'));
                const { sound: shootCannonSoundL4 } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/cannonShotL4.wav'));
                const { sound: tntExplosionSound } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/hugeExplosion.wav'));
                const { sound: tntHandleClickSound } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/tntHandleClick.wav'));
                const { sound: cannonBallBounceSound } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/cannonBallBounce.wav'));
                const { sound: tntCannonBallHitSound } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/woodHit.wav'));
                const { sound: cannonBallHitSandSound } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/cannonBallHitsBottom.wav'));
                const { sound: hitHatchBtn } = await Audio.Sound.createAsync(require('../../assets/sounds/soundEffects/hitHatchBtn.wav'));
                const { sound: backgroundMusicSound } = await Audio.Sound.createAsync(require('../../assets/sounds/backgroundMusic.mp3'), { volume: 0.1 });
                const { sound: backgroundWaveSound } = await Audio.Sound.createAsync(require('../../assets/sounds/backgroundWaves.wav'), { volume: 0.1 });

                // SET AUDIO FILES IN REF VARIABLES
                sounds.current = {
                    shootCannonSoundL1,
                    shootCannonSoundL2,
                    shootCannonSoundL3,
                    shootCannonSoundL4,
                    tntCannonBallHitSound,
                    tntExplosionSound,
                    backgroundMusicSound,
                    tntHandleClickSound,
                    cannonBallBounceSound,
                    cannonBallHitSandSound,
                    backgroundWaveSound,
                    hitHatchBtn
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
                        setIsGameOverNoDelay: setIsGameOverNoDelay,
                        bounceLevel: cannonBallBounce,
                        isSoundEffectsOn: isSoundEffectsOn,
                        isHapticsOn: isHapticsOn,
                        lastHinderanceHit: ''
                    },
                    cannonBall: {
                        position: [-100, 0],
                        // prev and next position are set in the fireCannonSystem.js
                        prevPosition: [],
                        nextPosition: [],
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
                        cannonSound: cannonSound,
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
        loadSoundsAndEntities();


        return () => {
            sounds.current.shootCannonSoundL1.unloadAsync();
            sounds.current.shootCannonSoundL2.unloadAsync();
            sounds.current.shootCannonSoundL3.unloadAsync();
            sounds.current.shootCannonSoundL4.unloadAsync();
            sounds.current.tntCannonBallHitSound.unloadAsync();
            sounds.current.tntExplosionSound.unloadAsync();
            sounds.current.backgroundMusicSound.unloadAsync();
            sounds.current.backgroundWaveSound.unloadAsync();
            sounds.current.tntCannonBallHitSound.unloadAsync();
            sounds.current.cannonBallBounceSound.unloadAsync();
            sounds.current.cannonBallHitSandSound.unloadAsync();
            sounds.current.tntHandleClickSound.unloadAsync();
        }
    }, [levelId, cannonSound]);

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
            try {
                const mapName = endGameData.current.nextLevel.split('/')[0];
                const link = endGameData.current.nextLevel.split('/')[1];
                const [nextLevel] = await getIndividualLevelData(mapName, link)
                setNextLevelData(nextLevel)
            } catch (error) {   
                console.log('error in getNextLevelData ', error)
            }
        }
        getNextLevelData();
    }, [])

    const nextLevel = endGameData.current.nextLevel.split('/')[1]; // Get the second part of the split
    const shouldShowNextBtnInModal = nextLevel.charAt(nextLevel.length - 1) === '1' ? false : true;
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
                            nextLevelData={shouldShowNextBtnInModal ? nextLevelData : null}
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
                            cannonSound={cannonSound}
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
});
