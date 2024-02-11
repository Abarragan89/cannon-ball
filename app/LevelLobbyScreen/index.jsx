import { View, StyleSheet, ScrollView } from 'react-native'
import Title from '../../Components/UI/Title';
import { useLocalSearchParams } from 'expo-router';
import colors from '../../constants/colors';
import BackArrow from '../../Components/UI/BackArrow';
import LevelTile from '../../Components/LevelTile';

const LevelLobbyScreen = () => {
    const { mapName, chapter } = useLocalSearchParams();

    const linkData = [
        { level: 'Level1' },
        { level: 'Level2' },
        { level: 'Level3' },
        { level: 'Level4' },
        { level: 'Level5' },
        { level: 'Level6' },
        { level: 'Level7' },
        { level: 'Level8' },
        { level: 'Level9' },
        { level: 'Level10' },
    ]


    return (
        <ScrollView>
            {mapName &&
                <View style={styles.root}>
                    <BackArrow />
                    <Title color={colors.primaryBlack} size={45}>{mapName}</Title>
                    <View style={styles.buttonContainer}>
                        {linkData.map((item, index) => (
                            <LevelTile key={index} route={`/GameScreen/${chapter}/${item.level}`}>
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
    buttonContainer: {
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})
