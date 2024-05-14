import { useRef, useState, useEffect } from "react";
import GameEngineWrapper from "../../../../Components/GameEngine/GameEngineWrapper";
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import cannonControlSystem from "../../../../systems/cannonControlSystem";
import fireCannonSystem from "../../../../systems/fireCannonSystem";
import TNTDetectionSystem from "../../../../systems/TNTDetectionSystem";
import CannonBall from "../../../../Components/GameEngine/CannonBall";
import PowerMeter from "../../../../Components/GameEngine/ PowerMeter";
import GameLevelInfoHeader from "../../../../Components/UI/GameLevelInfoHeader";
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
import giantTallSystemOne from "../../../../systems/hinderanceDetection/giantTallSystemOne";
import smallSquareSystemOne from "../../../../systems/hinderanceDetection/smallSquareSystemOne";
import smallSquareSystemTwo from "../../../../systems/hinderanceDetection/smallSquareSystemTwo";
import smallSquareSystemThree from "../../../../systems/hinderanceDetection/smallSquareSystemThree";
import krakenLevelTwo from "../../../../systems/krakenMovementSystems/krakenLevelTwo";
import Hinderance from "../../../../Components/GameEngine/Hinderances/Hinderance";
import { getIndividualLevelData } from "../../../../db/selectQueries";

function ChapterFourLevelTwo() {
    const [isGameOver, setIsGameOver] = useState(false);
    const endGameData = useRef({
        accuracyFloat: 50,
        accuracyName: '',
        winningScore: [500, 1000, 2000],
        airTime: 0,
        bounces: 0,
        multiplier: 0,
        currentLevel: 'Kraken',
        nextLevel: 'Kraken/Level3'
    });

    // Angle Data
    const angleLevelRef = useRef(90);
    // Power Data
    const powerLevelRef = useRef(15);

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
    }, []);


    return (

        <ImageBackground
            source={require('../../../../assets/images/basics/level1.png')}
            style={styles.backgroundImg}
        >
            <GameEngineWrapper
                systems=
                {[
                    cannonControlSystem,
                    TNTDetectionSystem,
                    scoreCalculatorSystem,
                    fireCannonSystem,
                    giantTallSystemOne,
                    smallSquareSystemOne,
                    smallSquareSystemTwo,
                    smallSquareSystemThree,
                    krakenLevelTwo
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
                    cannon: {
                        position: [screenWidth - 200, screenHeight - 100],
                        lowerTravelLimit: Math.floor(screenWidth / 2) + 80,
                        rotate: '-90deg',
                        renderer: <CannonLauncher />
                    },
                    TNT: {
                        position: [250, screenHeight - 110],
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
                    giantTallOne: {
                        position: [Math.floor(screenWidth / 2), screenHeight - 315],
                        width: 70,
                        height: 300,
                        renderer: <Hinderance />
                    },
                    squareHindOne: {
                        position: [0, screenHeight - 200],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    },
                    squareHindTwo: {
                        position: [Math.floor(screenWidth / 4) - 10, screenHeight - 250],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    },
                    squareHindThree: {
                        position: [Math.floor(screenWidth / 2) - 50, screenHeight - 300],
                        width: 40,
                        height: 40,
                        renderer: <Hinderance />
                    },
                    fireBtn: {
                        isShooting: false,
                        renderer: <FireBtn />
                    }
                }}
                endGameData={endGameData}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}
            >
                <StatusBar hidden={true} />
                <BackArrow
                    route={'/LevelLobbyScreen'}
                    params={{ mapName: 'Kraken' }}
                />
                <GameLevelInfoHeader
                    mapName={'Kraken'}
                    levelNumber={2}
                />
                {isGameOver && nextLevelData &&
                    <EndGameModal
                        endGameData={endGameData}
                        nextLevelData={nextLevelData}
                    />
                }
            </GameEngineWrapper>
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


export default ChapterFourLevelTwo;
