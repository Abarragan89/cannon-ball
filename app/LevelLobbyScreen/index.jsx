import { View, StyleSheet, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Title from '../../Components/UI/Title';
import colors from '../../constants/colors';
import BackArrow from '../../Components/UI/BackArrow';
import WinningScoresDisplay from '../../Components/UI/WinningScoresDisplay';
import LevelTile from '../../Components/LevelTile';
import {
    getAllLevelDataInMap,
    getUserDataPreferences,
    getUserCannonBalls,
    getUserCannons
} from '../../db/selectQueries';

const LevelLobbyScreen = () => {
    const { mapName } = useLocalSearchParams();
    const [currentLevelData, setCurrentLevelData] = useState([]);
    const [winningStarLimits, setWinningStarLimits] = useState(null);
    const [userPreferences, setUserPreferences] = useState(null);
    const [currentCannonBall, setCurrentCannonBall] = useState({});
    const [currentCannon, setCurrentCannon] = useState({})

    useEffect(() => {
        // Set winning stars
        function setWinningStars() {
            switch (mapName) {
                case 'Basics':
                case 'Marks':
                    setWinningStarLimits([100, 250, 1000]);
                    break;
                case 'Hinderance':
                    setWinningStarLimits([1000, 2500, 5000]);
                    break;
                case 'Kraken':
                case 'Hatch':
                    setWinningStarLimits([500, 1000, 2000]);
                    break;
            }
        }
        // Get all level data
        async function getLevelData() {
            const levelData = await getAllLevelDataInMap(1, mapName);
            setCurrentLevelData(levelData)
        }

        if (mapName) {
            getLevelData();
            setWinningStars();
        };
    }, [mapName]);

    // Get user preferences and current cannonBall
    useEffect(() => {
        async function getUserPreferences() {
            try {
                // only one item in the array so we can destructure
                const [userPref] = await getUserDataPreferences(1)
                setUserPreferences(userPref)
                // get the current cannonBall
                const cannonBalls = await getUserCannonBalls(1);
                const [currentBall] = cannonBalls.filter(cannonBall => cannonBall.name === userPref.currentCannonBallName)
                setCurrentCannonBall(currentBall)
                // get the current cannon (need to power)
                const cannons = await getUserCannons(1);
                const [currentCannon] = cannons.filter(cannon => cannon.name === userPref.currentCannonName)
                setCurrentCannon(currentCannon)
            } catch (error) {
                console.log('error getting user pref in level lobby ', error)
            }
        }
        getUserPreferences();
    }, [])

    return (
        <>
            <StatusBar hidden={true} />
            <ImageBackground
                source={require('../../assets/images/levelLobbyBgImage.png')}
                style={styles.backgroundImg}
            >
                <View style={styles.backIcon}>
                    <BackArrow
                        route='CampaignOverviewScreen'
                    />
                </View>
                <ScrollView>
                    {currentLevelData && userPreferences && currentCannonBall &&
                        <View style={styles.root}>
                            <View style={styles.titleContainer}>
                                <Title color={colors.offWhite} size={50}>{mapName}</Title>
                            </View>
                            <WinningScoresDisplay winningLimits={winningStarLimits} />
                            <View style={styles.levelBtnContainer}>
                                {currentLevelData.map((item, index) => (
                                    <View key={index} style={styles.singleLevelButton}>
                                        <LevelTile
                                            route={`/GameScreen/${mapName}/${item.link}`}
                                            params={{
                                                levelId: item.id,
                                                lastAccuracy: item.accuracy,
                                                lastHighscore: item.highscore,
                                                lastEarnedStars: item.earnedStars,
                                                isSoundOn: userPreferences.isSoundOn,
                                                isSoundEffectsOn: userPreferences.isSoundEffectsOn,
                                                isHapticsOn: userPreferences.isHapticsOn,
                                                cannonBallColor: currentCannonBall.color,
                                                cannonBallGradientClr: currentCannonBall.gradientColor,
                                                cannonBallBounce: currentCannonBall.bounce,
                                                cannonBallWeight: currentCannonBall.weight,
                                                cannonBallSize: currentCannonBall.size,
                                                cannonColor: currentCannon.name,
                                                cannonPower: currentCannon.power
                                            }}
                                            isLocked={item.isOpen}
                                            accuracy={item.accuracy}
                                            highscore={item.highscore}
                                            earnedStars={item.earnedStars}
                                            currentLevel={item.level}
                                        >
                                            {item.level}
                                        </LevelTile>
                                    </View>
                                ))}
                            </View>
                        </View>
                    }
                </ScrollView>
            </ImageBackground>
        </>
    )
}

export default LevelLobbyScreen;

const styles = StyleSheet.create({
    backgroundImg: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    backIcon: {
        zIndex: 2
    },
    titleContainer: {
        marginTop: 20
    },
    levelBtnContainer: {
        justifyContent: 'space-around',
        marginHorizontal: 50,
        marginTop: 10,
        flexWrap: 'nowrap',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    singleLevelButton: {
        marginTop: 10,
    }
})
