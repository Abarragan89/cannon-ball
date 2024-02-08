import { StyleSheet, View } from "react-native";
import { Link } from "expo-router"
import Title from "../../Components/UI/Title";
import { StatusBar } from "expo-status-bar";
import colors from "../../constants/colors";

const SettingScreen = () => {
    return (
        <View style={styles.rootContainer}>
            <Title>Settings Screen</Title>
            <Link href="/">Back To Home</Link>
        </View>
    )
}

export default SettingScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    }
})
