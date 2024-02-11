import { View, StyleSheet } from "react-native";
import { useCallback } from "react";
import Title from "../Components/UI/Title";
import MainButton from "../Components/UI/MainButton";
import colors from "../constants/colors";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Home = () => {

  const [fontsLoaded, fontError] = useFonts({
    'titleFont': require('../assets/fonts/titleFont.ttf'),
    'textFont': require('../assets/fonts/textFont.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return (
    <>
    <StatusBar 
      style="dark" 
      backgroundColor={colors.sandColor}  
    />
    <View style={styles.rootContainer} onLayout={onLayoutRootView}>
      <Title color={colors.primaryBlack} size={45}>Cannon Ball!</Title>
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
