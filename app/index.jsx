import { View, StyleSheet, ImageBackground, StatusBar } from "react-native";
import { useCallback, useEffect } from "react";
import MainButton from "../Components/UI/MainButton";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
const mainBtnImgSrc = require('../assets/images/btnWoodBg.png')
const bgImage = require('../assets/images/homeScreenImg.png')
import { initDB } from "../db/init";

SplashScreen.preventAutoHideAsync();

const Home = () => {
  const [fontsLoaded, fontError] = useFonts({
    'titleFont': require('../assets/fonts/titleFont.ttf'),
    'textFont': require('../assets/fonts/textFont.ttf'),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if ((fontsLoaded)) {
  //     await initDB();
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // No need for useCallback here
  const hideSplashScreen = async () => {
    if (fontsLoaded) {
      await initDB(); // Initialize the database
      await SplashScreen.hideAsync();
    }
  };

  // Trigger the function on render and font loading completion
  useEffect(() => {
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null
  }


  return (
    <>
      <StatusBar hidden={true} />
      {mainBtnImgSrc && bgImage &&
        <ImageBackground
          source={bgImage}
          style={[
            !mainBtnImgSrc || !bgImage ? { display: 'none ' } : {},
            styles.rootContainer
          ]}
        >
          <View style={styles.buttonContainer}>
            <MainButton
              route="/CampaignOverviewScreen"
              imgSrc={mainBtnImgSrc}
            >
              Campaign
            </MainButton>
            <MainButton
              route="/StoreScreen"
              imgSrc={mainBtnImgSrc}
            >
              Store
            </MainButton>

            <MainButton
              route="/SettingScreen"
              imgSrc={mainBtnImgSrc}
            >
              Settings
            </MainButton>
          </View>
        </ImageBackground>
      }
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
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
