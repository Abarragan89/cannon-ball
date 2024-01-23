import { View, Text } from "react-native";
import { Link } from "expo-router"

const CampaignOverview = () => {
    return (
        <View>
            <Text>Campaign</Text>
            <Link href={{
                pathname: "/GameScreen",
                params: {level: 1}
                }}>Game Screen</Link>
            <Link href="/">Back Home</Link>
        </View>
    )
}

export default CampaignOverview;
