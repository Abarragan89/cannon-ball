import { Text, View } from "react-native";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View>
    <Text>Home Page</Text>

    <Link href="/CampaignOverviewScreen">Campagin</Link>

    <Link href="/StoreScreen">Store</Link>
    <Link href="SettingScreen">Settings</Link>
    </View>
  )
}

export default Home;
