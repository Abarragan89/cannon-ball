import { View, StyleSheet } from "react-native";
import Title from "../Components/UI/Title";
import MainButton from "../Components/UI/MainButton";
import colors from "../constants/colors";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  
  return (
    <>
    <StatusBar 
      style="light" 
      backgroundColor={colors.primaryBlue}  
    />
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
    </>
  )
}

export default Home;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  }
})
