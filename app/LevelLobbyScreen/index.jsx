import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import Title from '../../Components/UI/Title';
import { useLocalSearchParams } from 'expo-router';
import colors from '../../constants/colors';
import BackArrow from '../../Components/UI/BackArrow';
import LevelTile from '../../Components/LevelTile';

const LevelLobbyScreen = () => {
    const { mapName } = useLocalSearchParams();

    const linkData = [
        { level: 'Level1' },
        { level: 'Level2' },
        { level: 'Level3' },
        { level: 'Level4' },
        { level: 'Level5' },
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
                        <Title color={colors.offWhite} size={45}>{mapName}</Title>
                        <View style={styles.levelBtnContainer}>
                            <View style={styles.singleLevelButton}>
                                {linkData.map((item, index) => (
                                    <LevelTile key={index} route={`/GameScreen/${mapName}/${item.level}`}>
                                        {item.level}
                                    </LevelTile>
                                ))}
                            </View>
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
    levelBtnContainer: {
        alignItems: 'center',
    },
    singleLevelButton: {
        marginTop: 10,
    }
})
