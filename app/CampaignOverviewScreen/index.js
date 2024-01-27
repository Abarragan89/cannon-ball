import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import Title from "../../Components/UI/Title";
import { StatusBar } from "expo-status-bar";
import colors from '../../constants/colors'

const CampaignOverview = () => {
    return (
        <View style={styles.rootContainer}>
            <StatusBar
                style="light"
                backgroundColor={colors.primaryBlue}
            />
            <Title>Campaign</Title>
            <Link href={{
                pathname: "/GameScreen",
                params: { level: 1 }
            }}>Game Screen</Link>
            <Link href="/">Back Home</Link>
        </View>
    )
}

export default CampaignOverview;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },

})
