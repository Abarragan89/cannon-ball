import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  Pressable
} from "react-native";
import { useState, useEffect } from "react";
import Title from "../../Components/UI/Title";
import BackArrow from "../../Components/UI/BackArrow";
import Card from "../../Components/UI/Card";
import colors from "../../constants/colors";
import CannonBallDisplay from "../../Components/UI/CannonBallDisplay";
import CannonLaunchDisplay from "../../Components/UI/CannonLaunchDisplay";
import PurchaseModal from "../../Components/UI/Modals/PurchaseModal";
import { getUserCannonBalls, getUserDataPreferences } from "../../db/selectQueries";


const StoreScreen = () => {

  const [cannonBallArr, setCannonBallArr] = useState([]);
  const [currentCannonBall, setCurrentCannonBall] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const closeModal = () => setShowItemModal(false);

  const displayModal = (itemInfo) => {
    setCurrentItem(itemInfo);
    setShowItemModal(true)
  }

  useEffect(() => {
    // Get User's Cannon balls
    async function getCannonBalls() {
      try {
        const cannonBallSet = await getUserCannonBalls(1);
        setCannonBallArr(cannonBallSet)
      } catch (error) {
        console.log('error getting cannonBall set ', error)
      }
    }
    // Get User Current CannonBall
    async function getCurrentCannonBall() {
      try {
        const [userPref] = await getUserDataPreferences(1);
        setCurrentCannonBall(userPref.currentCannonBallName)
      } catch (error) {
        console.log('error getting current cannonBall', error)
      }
    }

    getCannonBalls();
    getCurrentCannonBall();
  }, [])

  return (
    <ImageBackground
      source={require('../../assets/images/screenWoodBg.png')}
      style={styles.rootContainer}
    >
      {showItemModal &&
        <PurchaseModal
          closeModal={closeModal}
          cannonBallInfo={currentItem}
          setCannonBallArr={setCannonBallArr}
          setCurrentCannonBall={setCurrentCannonBall}
        />
      }
      <StatusBar barStyle='light-content' />
      <View style={styles.backIcon}>
        <BackArrow />
      </View>
      <View style={styles.rootContainer}>
        <Title color={colors.offWhite} size={45}>Store</Title>
        <View style={styles.cardContainer}>
          <Card
            title={'Cannon Balls'}
          >
            <ScrollView horizontal={true}>
              {cannonBallArr && currentCannonBall && cannonBallArr.map((cannonBall, index) =>
                <Pressable key={index} onPress={() => displayModal(cannonBall)}>
                  <CannonBallDisplay
                    color={cannonBall.color}
                    isOwned={cannonBall.isOwned}
                    gradientColor={cannonBall.gradientColor}
                    size={cannonBall.size}
                    isEquipped={cannonBall.name === currentCannonBall}
                    name={cannonBall.name}
                  />
                </Pressable>
              )}
            </ScrollView>
          </Card>



          <Card
            title={'Cannons'}
          >
            <ScrollView horizontal={true}>
              <CannonLaunchDisplay />
              <CannonLaunchDisplay />
              <CannonLaunchDisplay />
              <CannonLaunchDisplay />
              <CannonLaunchDisplay />
              <CannonLaunchDisplay />
              <CannonLaunchDisplay />
            </ScrollView>
          </Card>
        </View>
      </View>
    </ImageBackground>
  )
};

export default StoreScreen;

const styles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    paddingTop: 15,
  },
  backIcon: {
    zIndex: 3
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lockedCannon: {
    backgroundColor: 'black'
  }
})
