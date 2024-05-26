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
import CannonBallStats from "../../Components/UI/CannonBallStats";
import CannonBallDisplay from "../../Components/UI/CannonBallDisplay";
import CannonLaunchDisplay from "../../Components/UI/CannonLaunchDisplay";
import PurchaseModal from "../../Components/UI/Modals/PurchaseModal";
import { getUserCannonBalls, getUserDataPreferences } from "../../db/selectQueries";
import { updateUserCurrentCannonBall } from "../../db/updateQueries";

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

  // update current cannon ball of user
  async function handlerUpdateCurrentCannonBall(cannonBallName) {
    try {
      //  Only need the name to update it in preferences
      await updateUserCurrentCannonBall(1, cannonBallName.name)
      // Need to set the entire object in currentCannonBall
      setCurrentCannonBall(cannonBallName);
      closeModal();
    } catch (error) {
      console.log('error updating user cannonBall ', error)
    }
  }

  useEffect(() => {
    // Get User's Cannon balls
    async function getCannonBalls() {
      try {
        // Get user preferences
        const [userPref] = await getUserDataPreferences(1);

        // Get all user Cannon Balls
        const cannonBallSet = await getUserCannonBalls(1);
        setCannonBallArr(cannonBallSet)

        // Get the Current Cannon Ball
        const [currentBall] = cannonBallSet.filter(cannonBall => cannonBall.name === userPref.currentCannonBallName)
        setCurrentCannonBall(currentBall)
      } catch (error) {
        console.log('error getting cannonBall set ', error)
      }
    }
    getCannonBalls();
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
        />
      }
      <StatusBar barStyle='light-content' />
      <View style={styles.backIcon}>
        <BackArrow />
      </View>
      {currentCannonBall &&
        <View style={styles.rootContainer}>
          <Title color={colors.offWhite} size={45}>Store</Title>
          <View style={styles.cardContainer}>
            <Card
              title={'Cannon Balls'}
            >
              <View style={styles.currentCannonBallAndStatsView}>
                <CannonBallDisplay
                  color={currentCannonBall.color}
                  gradientColor={currentCannonBall.gradientColor}
                  size={55}
                  isOwned={currentCannonBall.isOwned}
                  name={currentCannonBall.name}
                  isEquipped={true}
                />
                <View style={styles.currentBallStatsView}>
                  <CannonBallStats
                    size={currentCannonBall.size}
                    weight={currentCannonBall.weight}
                    bounce={currentCannonBall.bounce}
                  />
                </View>

              </View>
              <ScrollView horizontal={true}>
                {cannonBallArr && currentCannonBall && cannonBallArr.map((cannonBall, index) =>
                  // Pressable callback will only show modal if the cannonBall is not already owned
                  // else it will just set that cannonball to current cannonBall
                  <Pressable key={index} onPress={() => cannonBall.isOwned ? handlerUpdateCurrentCannonBall(cannonBall) : displayModal(cannonBall)}>
                    <CannonBallDisplay
                      color={cannonBall.color}
                      isOwned={cannonBall.isOwned}
                      gradientColor={cannonBall.gradientColor}
                      size={cannonBall.size}
                      isEquipped={cannonBall.name === currentCannonBall.name}
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
      }
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
  currentCannonBallAndStatsView: {
    flexDirection: 'row'
  },
  lockedCannon: {
    backgroundColor: 'black'
  }
})
