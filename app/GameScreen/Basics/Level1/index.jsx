import { useRef, useState, useEffect } from "react";
import { GameEngine } from "react-native-game-engine"
import { StyleSheet, StatusBar, ImageBackground, Button } from 'react-native';
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


function ChatperOneLevelOne() {
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

    ///////////////////// CREATE SOUNDS /////////////////////
    const [cannonBallSound, setCannonBallSound] = useState();
    const [fireworkSound, setFireworkSound] = useState();
    const [explosionSound, setExplosionSound] = useState();
    const [tntHandleClickSound, setTntHandleClickSound] = useState();
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);

    useEffect(() => {
        // import sounds and save in state
        async function loadAudio() {
            const { sound: cannonShot } = await Audio.Sound.createAsync(require('../../../../assets/sounds/cannonShot.mp3'));
            const { sound: explosion } = await Audio.Sound.createAsync(require('../../../../assets/sounds/hugeExplosion.wav'));
            const { sound: fireworks } = await Audio.Sound.createAsync(require('../../../../assets/sounds/fireworks.wav'));
            const { sound: tntHandleClick } = await Audio.Sound.createAsync(require('../../../../assets/sounds/tntHandleClick.wav'))

            setCannonBallSound(cannonShot);
            setExplosionSound(explosion);
            setFireworkSound(fireworks)
            setTntHandleClickSound(tntHandleClick)
            setIsAudioLoaded(true)
        }
        
        loadAudio();
        // unload sounds when unmounted
        return () => {
            if (cannonBallSound) cannonBallSound.unloadAsync();
            if (fireworkSound) fireworkSound.unloadAsync();
            if (explosionSound) explosionSound.unloadAsync();
            if (tntHandleClickSound) tntHandleClickSound.unloadAsync();
        }
    }, [])

    return (
        <ImageBackground
            source={require('../../../../assets/images/basics/level1.png')}
            style={styles.backgroundImg}
        >
            {isAudioLoaded &&
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
                            shootCannonSound: cannonBallSound,
                            tntExplosionSound: explosionSound,
                            tntHandleClickSound: tntHandleClickSound,
                            fireworkSound: fireworkSound
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
