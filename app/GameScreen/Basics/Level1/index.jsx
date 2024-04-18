import { useRef, useState, useContext, useEffect } from "react";
import { useLocalSearchParams } from 'expo-router';
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
import { SoundContext } from "../../../../store/soundsContext";
import { 
    updateLevelToPass, 
    updateLevelHighScore, 
    updateLevelAccuracy, 
    updateLevelEarnedStars } from "../../../../utils/db/updateQueries";

function ChatperOneLevelOne() {
    // Grab the level Id 
    const { levelId, lastAccuracy, lastHighscore, lastEarnedStars, isPassed } = useLocalSearchParams();

    // Load sounds from context API, make gameEngineRef, and gameOver State
    const { sounds: gameSoundContext } = useContext(SoundContext);
    const gameEngineRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [playBgMusic, setPlayBgMusic] = useState(true)

    const endGameData = useRef({
        accuracyFloat: 0,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Basics',
        nextLevel: 'Basics/Level2'
    });

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
    }, [playBgMusic]);



    useEffect(() => {
        // 'isGameOver' should more appropriately be named 'gameWon'
        if (isGameOver) {
            // get highscore, accuracy, and earnedStars amount after user wins
            const currentHighScore = endGameData.current.multiplier * (endGameData.current.airTime * endGameData.current.bounces)
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
                if (!isPassed) {
                    await updateLevelToPass(levelId)
                }
                // Compare the highscore to the old highscore
                if (currentHighScore > lastHighscore) {
                    await updateLevelHighScore(levelId, currentHighScore)
                }
                // Compare the accuracy with old accuracy
                if (currentAccuracy > lastAccuracy) {
                    await updateLevelAccuracy(levelId, currentAccuracy)
                }
                // Compare earnedStars
                if (currentEarnedStars > lastEarnedStars) {
                    await updateLevelEarnedStars(levelId, currentEarnedStars)
                }
            }
            updateLevelData();
        }
    }, [isGameOver, endGameData.current])


    // Angle Data
    const angleLevelRef = useRef(90)
    // Power Data
    const powerLevelRef = useRef(15)

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
                            setPlayBgMusic: setPlayBgMusic,
                            isGameOver: false,
                            setIsGameOver: setIsGameOver,
                        },
                        sounds: {
                            shootCannonSound: gameSoundContext?.current?.shootCannonSound,
                            tntExplosionSound: gameSoundContext?.current?.tntExplosionSound,
                            tntHandleClickSound: gameSoundContext?.current?.tntHandleClickSound,
                            backgrounMusicSound: gameSoundContext?.current?.backgrounMusicSound,
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
