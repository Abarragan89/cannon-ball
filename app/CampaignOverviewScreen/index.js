import { StyleSheet, View } from "react-native";
import Title from "../../Components/UI/Title";
import MainButton from "../../Components/UI/MainButton";
import colors from '../../constants/colors'
import BackArrow from "../../Components/UI/BackArrow";

const CampaignOverview = () => {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.backIcon}>
                <BackArrow />
            </View>

            <View style={styles.headerRoot}>
                <Title color={colors.primaryOrange}>Campaign Maps</Title>
            </View>

            <View style={styles.mapBtnContainer}>
                <MainButton
                    route="/LevelLobbyScreen"
                    params={{
                        mapName: 'Map One',
                        chapter: 'ChapterOne'
                    }}>
                    Map 1
                </MainButton>
                <MainButton
                    route="/LevelLobbyScreen"
                    params={{
                        mapName: 'Map Two',
                        chapter: 'ChapterTwo'
                    }}>
                    Map 2
                </MainButton>
                <MainButton
                    route="/LevelLobbyScreen"
                    params={{
                        mapName: 'Map Three',
                        chapter: 'ChapterThree'
                    }}>
                    Map 3
                </MainButton>
            </View>
        </View>
    )
}

export default CampaignOverview;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },

    headerRoot: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        zIndex: -1
    },
    mapBtnContainer: {
        marginTop: 30,
        alignItems: 'center',
    }

})
