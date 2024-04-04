import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import Title from '../../Components/UI/Title';
import { useLocalSearchParams } from 'expo-router';
import colors from '../../constants/colors';
import BackArrow from '../../Components/UI/BackArrow';
import LevelTile from '../../Components/LevelTile';

const LevelLobbyScreen = () => {
    const { mapName } = useLocalSearchParams();

    const levelData = [
        {
            link: 'Level1',
            level: 'Level One',
            isLocked: false,
        },
        {
            link: 'Level2',
            level: 'Level Two',
            isLocked: false,
        },
        {
            link: 'Level3',
            level: 'Level Three',
            isLocked: false,
        },
        {
            link: 'Level4',
            level: 'Level Four',
            isLocked: true,
        },
        {
            link: 'Level5',
            level: 'Level Five',
            isLocked: true,
        },
    ]


    return (
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
                {mapName &&
                    <View style={styles.root}>
                        <View style={styles.titleContainer}>
                            <Title color={colors.offWhite} size={50}>{mapName}</Title>
                        </View>
                        <View style={styles.levelBtnContainer}>
                            {levelData.map((item, index) => (
                                <View key={index} style={styles.singleLevelButton}>
                                    <LevelTile
                                        route={`/GameScreen/${mapName}/${item.link}`}
                                        isLocked={item.isLocked}
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
        marginTop: 20,
        flexWrap: 'nowrap',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    singleLevelButton: {
        marginTop: 10,
    }
})
