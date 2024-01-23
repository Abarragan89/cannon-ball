import { View, Text } from "react-native";
import { Link } from "expo-router"

const SettingScreen = () => {
    return (
        <View>
            <Text>Settings Screen</Text>
            <Link href="/">Back To Home</Link>
        </View>
    )
}

export default SettingScreen
