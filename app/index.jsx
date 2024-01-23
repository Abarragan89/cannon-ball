import { Text, View } from "react-native";
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View>
    <Text>Home Page</Text>

    <Link href="/CampaignOverviewScreen">See Campagin</Link>
    </View>
  )
}

export default Index;
