import { StyleSheet, Dimensions } from "react-native";
import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';
const screenHeight = Dimensions.get('window').height;
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
        cannonBallSize
    } = useLocalSearchParams();

    console.log('cannon specs from params ', cannonBallBounce, cannonBallColor, cannonBallGradientClr, cannonBallWeight, cannonBallSize)

    const [playBgMusic, setPlayBgMusic] = useState(true);
    const [newEntities, setNewEntities] = useState(entities);
    const [isSoundLoaded, setIsSoundLoaded] = useState(false);

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
                const { sound: shootCannonSound } = await Audio.Sound.createAsync(require('../../assets/sounds/cannonShot.mp3'));
                const { sound: tntExplosionSound } = await Audio.Sound.createAsync(require('../../assets/sounds/hugeExplosion.wav'));
                const { sound: backgroundMusicSound } = await Audio.Sound.createAsync(require('../../assets/sounds/backgroundMusic.mp3'), { volume: 0.4 });
                const { sound: tntHandleClickSound } = await Audio.Sound.createAsync(require('../../assets/sounds/tntHandleClick.wav'));
                const { sound: cannonBallBounceSound } = await Audio.Sound.createAsync(require('../../assets/sounds/cannonBallBounce.wav'));
                const { sound: tntCannonBallHitSound } = await Audio.Sound.createAsync(require('../../assets/sounds/woodHit.wav'));
                const { sound: cannonBallHitSandSound } = await Audio.Sound.createAsync(require('../../assets/sounds/cannonBallHitsBottom.wav'));
                const { sound: backgroundWaveSound } = await Audio.Sound.createAsync(require('../../assets/sounds/backgroundWaves.wav'), { volume: 0.4 });

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
                        isHapticsOn: isHapticsOn

                    },
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

    return (
        <>
            {isSoundLoaded &&
                <GameEngine
                    style={styles.container}
                    systems={systems}
                    entities={newEntities}>
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
