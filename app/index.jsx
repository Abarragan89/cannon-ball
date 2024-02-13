import { View, StyleSheet, ImageBackground } from "react-native";
import { useCallback } from "react";
import Title from "../Components/UI/Title";
import MainButton from "../Components/UI/MainButton";
import colors from "../constants/colors";
import { useFonts } from 'expo-font';
import CannonLauncher from "../Components/GameEngine/CannonLauncher";
import * as SplashScreen from 'expo-splash-screen';
import { Dimensions } from "react-native";
import TNT from "../Components/GameEngine/TNT";
const { height, width } = Dimensions.get('window')

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
      {/* <StatusBar
        style="dark"
        backgroundColor={colors.sandColor}
      /> */}
      <ImageBackground
        source={require('../assets/images/homeScreenImg.png')}
        style={styles.rootContainer}
        onLayout={onLayoutRootView}>
        <Title color={colors.offWhite} size={45}>Cannon Ball!</Title>
        <View style={styles.buttonContainer}>
          <MainButton
            route="/CampaignOverviewScreen">
            Campaign
          </MainButton>

          <MainButton
            route="/StoreScreen">
            Store
          </MainButton>

          <MainButton
            route="/SettingScreen">
            Settings
          </MainButton>
        </View>
        <CannonLauncher 
          position={[30, height - 100]}
          rotate={'-50deg'}
        />
         <CannonLauncher 
          position={[width - 100, height - 100]}
          rotate={'-130deg'}
        />
        <TNT 
          position={[Math.floor(width/2) - 20, 50]}
          diplay='block'
          handlePosition={[-13, 0]}
        />
      </ImageBackground>
    </>
  )
}

export default Home;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  }
})
