import { StyleSheet, View, ImageBackground } from "react-native";
import Title from "../../Components/UI/Title";
import MainButton from "../../Components/UI/MainButton";
import BackArrow from "../../Components/UI/BackArrow";
import colors from "../../constants/colors";

const CampaignOverview = () => {
    return (
        <>
            <View style={styles.backIcon}>
                <BackArrow />
            </View>
            <ImageBackground
                source={require('../../assets/images/treasureMapBg.png')}
                style={styles.rootContainer}>
                <View style={styles.headerRoot}>
                    <Title color={colors.offWhite} size={45}>Campaign Maps</Title>
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
            </ImageBackground>
        </>
    )
}

export default CampaignOverview;

const styles = StyleSheet.create({
    backIcon: {
        zIndex: 2
    },
    rootContainer: {
        position: 'absolute',
        paddingTop: 10,
        right: 0, 
        left: 0,
        top: 0, 
        bottom: 0
    },
    headerRoot: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        zIndex: 1
    },
    mapBtnContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    }

})
