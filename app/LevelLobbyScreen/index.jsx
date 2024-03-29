import { View, StyleSheet, ScrollView } from 'react-native'
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
        <ScrollView>
            <View style={styles.backIcon}>
                <BackArrow 
                    route='CampaignOverviewScreen'
                />
            </View>
            {mapName &&
                <View style={styles.root}>
                    <Title color={colors.offWhite} size={45}>{mapName}</Title>
                    <View style={styles.buttonContainer}>
                        {linkData.map((item, index) => (
                            <LevelTile key={index} route={`/GameScreen/${mapName}/${item.level}`}>
                                {item.level}
                            </LevelTile>
                        ))}
                    </View>
                </View>
            }
        </ScrollView>
    )
}

export default LevelLobbyScreen;

const styles = StyleSheet.create({
    backIcon: {
        zIndex: 2
    },
    buttonContainer: {
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})
