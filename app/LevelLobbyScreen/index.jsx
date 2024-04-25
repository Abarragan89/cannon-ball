import { View, StyleSheet, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Title from '../../Components/UI/Title';
import colors from '../../constants/colors';
import BackArrow from '../../Components/UI/BackArrow';
import WinningScoresDisplay from '../../Components/UI/WinningScoresDisplay';
import LevelTile from '../../Components/LevelTile';
import { getAllLevelDataInMap } from '../../utils/db/selectQueries';

const LevelLobbyScreen = () => {
    const { mapName } = useLocalSearchParams();

    const [currentLevelData, setCurrentLevelData] = useState([])
    const [winningStarLimits, setWinningStarLimits] = useState(null)

    useEffect(() => {
        
        function setWinningStars() {
            switch (mapName) {
                case 'Basics':
                    setWinningStarLimits([500, 2000, 4000]);
                    break;
                case 'Marks':
                    setWinningStarLimits([250, 500, 1000]);
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
        async function getLevelData() {
            const levelData = await getAllLevelDataInMap(1, mapName);
            setCurrentLevelData(levelData)
        }
        if (mapName) {
            getLevelData();
            setWinningStars();
        };
    }, [mapName]);

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
                    {mapName && currentLevelData && winningStarLimits &&
                        <View style={styles.root}>
                            <View style={styles.titleContainer}>
                                <Title color={colors.offWhite} size={50}>{mapName}</Title>
                            </View>
                            <WinningScoresDisplay winningLimits={winningStarLimits}/>
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
