import { View, StyleSheet, ImageBackground, StatusBar } from "react-native";
import { useCallback } from "react";
import Title from "../Components/UI/Title";
import MainButton from "../Components/UI/MainButton";
import colors from "../constants/colors";
import { useFonts } from 'expo-font';
import CannonLauncher from "../Components/GameEngine/CannonLauncher";
import * as SplashScreen from 'expo-splash-screen';
import { Dimensions } from "react-native";
const mainBtnImgSrc = require('../assets/images/btnWoodBg.png')
const bgImage = require('../assets/images/homeScreenImg.png')
const { height } = Dimensions.get('screen');
import { initDB } from "../db/init";

SplashScreen.preventAutoHideAsync();

const Home = () => {
  const [fontsLoaded, fontError] = useFonts({
    'titleFont': require('../assets/fonts/titleFont.ttf'),
    'textFont': require('../assets/fonts/textFont.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if ((fontsLoaded || fontError) && bgImage && mainBtnImgSrc) {
      await initDB();
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, bgImage, mainBtnImgSrc]);

  if ((!fontsLoaded && !fontError)) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle='light-content' />
      {mainBtnImgSrc && bgImage &&
        <ImageBackground
          source={bgImage}
          style={[
            !mainBtnImgSrc || !bgImage ? { display: 'none ' } : {},
            styles.rootContainer
          ]}
          onLayout={onLayoutRootView}
        >
          <Title color={colors.offWhite} size={45}>Cannon Ball!</Title>
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
          <CannonLauncher
            position={[80, height - 100]}
            rotate={'-50deg'}
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  }
})
