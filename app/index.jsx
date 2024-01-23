import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Title from "../Components/UI/Title";
import MainButton from "../Components/UI/MainButton";

const Home = () => {
  return (
    <View style={styles.rootContainer}>
      <Title>Cannon Ball!</Title>
      <View style={styles.buttonContainer}>

        <MainButton route="/CampaignOverviewScreen">
          Campaign
        </MainButton>

        <MainButton route="/StoreScreen">
            Store
        </MainButton>

        <MainButton route="/SettingScreen">
          Settings
        </MainButton>
      </View>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  rootContainer: {
    margin: 24,
    marginTop: 10
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  }
})
