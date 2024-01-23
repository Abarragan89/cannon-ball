import { useLocalSearchParams } from 'expo-router';
import { View, Text } from "react-native";
import { Link } from "expo-router";

const GameScreen = () => {

    const { level } = useLocalSearchParams();

    return (
        <View>
            <Text>This is a Game at level {level}</Text>
            <Link href="/CampaignOverviewScreen">Back to Campaign</Link>
        </View>
    )
}

export default GameScreen;
