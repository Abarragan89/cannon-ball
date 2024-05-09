import { useRef, useState, useContext, useEffect } from "react";
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
import { SoundContext } from "../../../../store/soundsContext";
import { getIndividualLevelData } from "../../../../utils/db/selectQueries";
import {
    updateLevelToPass,
    updateLevelHighScore,
    updateLevelAccuracy,
    updateUserTotalPoints,
    updateLevelEarnedStars
} from "../../../../utils/db/updateQueries";

// import followCannonBallOnMove from "../../../../systems/followCannonBallOnMove";

function ChatperOneLevelOne() {
    // Grab the level Id 
    const { 
        levelId, 
        lastAccuracy, 
        lastHighscore, 
        lastEarnedStars,
        userPreferences
    } = useLocalSearchParams();

    console.log('user preferences as route paramaters ', userPreferences)

    // Load sounds from context API, make gameEngineRef, and gameOver State
    const { sounds: gameSoundContext } = useContext(SoundContext);

    const gameEngineRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [playBgMusic, setPlayBgMusic] = useState(true)

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

    // Play background noises and stop them when game is over
    useEffect(() => {
        async function stopMusic() {
            try {
                await gameSoundContext.current.backgroundMusicSound.setIsLoopingAsync(false);
                await gameSoundContext.current.backgroundWaveSound.setIsLoopingAsync(false);
                await gameSoundContext.current.backgroundMusicSound.stopAsync();
                await gameSoundContext.current.backgroundWaveSound.stopAsync();
            } catch (error) {
                console.log('error stopping music in useEffect ', error)
            }
        }
        async function startMusic() {
            try {
                await gameSoundContext.current.backgroundMusicSound.setIsLoopingAsync(true);
                await gameSoundContext.current.backgroundMusicSound.playAsync();
                await gameSoundContext.current.backgroundWaveSound.setIsLoopingAsync(true);
                await gameSoundContext.current.backgroundWaveSound.playAsync();
            } catch (error) {
                console.log('error starting music ', error);
            }
        }
        // start music if state is available and user preferences have soundOn
        if (playBgMusic && gameSoundContext) startMusic();
        return () => {
            stopMusic();
        }
    }, [playBgMusic, gameSoundContext]);


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
