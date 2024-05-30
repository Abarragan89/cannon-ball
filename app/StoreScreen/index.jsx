import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import Title from "../../Components/UI/Title";
import BackArrow from "../../Components/UI/BackArrow";
import Card from "../../Components/UI/Card";
import colors from "../../constants/colors";
import CannonBallStats from "../../Components/UI/CannonBallStats";
import CannonBallDisplay from "../../Components/UI/CannonBallDisplay";
import CannonLaunchDisplay from "../../Components/UI/CannonLaunchDisplay";
import UserAllTimeNavStats from "../../Components/UI/UserAllTimeNavStats";
import PurchaseModal from "../../Components/UI/Modals/PurchaseModal";
import {
  getUserCannonBalls,
  getUserDataPreferences,
  getUserTotalPoints,
  getUserCannons
} from "../../db/selectQueries";
import { updateUserCurrentCannonBall } from "../../db/updateQueries";

const StoreScreen = () => {

  const [cannonBallArr, setCannonBallArr] = useState([]);
  const [cannonArr, setCannonArr] = useState([]);
  const [currentCannonBall, setCurrentCannonBall] = useState(null);
  const [currentCannon, setCurrentCannon] = useState(null);
  const [userCoins, setUserCoins] = useState(null);
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
    // Get User's Cannon balls and Coin amount
    async function getStoreData() {
      try {
        // Get user preferences
        const [userPref] = await getUserDataPreferences(1);

        // Get all user Cannon Balls
        const cannonBallSet = await getUserCannonBalls(1);
        setCannonBallArr(cannonBallSet);

        // Get the Current Cannon Ball
        const [currentBall] = cannonBallSet.filter(cannonBall => cannonBall.name === userPref.currentCannonBallName)
        setCurrentCannonBall(currentBall);

        // Get user Coins to pass to Purchase Modal
        const [{ totalPoints }] = await getUserTotalPoints(1);
        setUserCoins(totalPoints);

        // Get all user cannons
        const cannons = await getUserCannons(1);
        setCannonArr(cannons);

        // Get the Current Cannon
        const [currentCannon] = cannons.filter(cannon => cannon.name === userPref.currentCannonName);
        setCurrentCannon(currentCannon);

      } catch (error) {
        console.log('error getting cannonBall set ', error)
      }
    }
    getStoreData();
  }, [])

  console.log('cannon array ', currentCannon)

  return (
    <>
      <UserAllTimeNavStats />
      <ImageBackground
        source={require('../../assets/images/screenWoodBg.png')}
        style={styles.rootContainer}
      >
        {showItemModal &&
          <PurchaseModal
            closeModal={closeModal}
            cannonBallInfo={currentItem}
            setCannonBallArr={setCannonBallArr}
            userCoins={userCoins}
          />
        }
        <StatusBar hidden={true} />
        <View style={styles.backIcon}>
          <BackArrow />
        </View>

        {currentCannonBall && currentCannon &&
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
                    <Pressable
                      key={index}
                      onPress={() => cannonBall.isOwned ? handlerUpdateCurrentCannonBall(cannonBall) : displayModal(cannonBall)}
                    >
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
                <View style={styles.currentCannonBallAndStatsView}>
                  <CannonLaunchDisplay
                    rotate={'-80deg'}
                    barrelColor={colors[currentCannon.name].barrel}
                    tipColor={colors[currentCannon.name].tip}
                    cannonBaseColor={colors[currentCannon.name].cannonBase}
                    cannonBallBolt={colors[currentCannon.name].cannonBallBolt}
                    cannonBallBoltHighlight={colors[currentCannon.name].cannonBallBoltHighlight}
                    wheelColor={colors[currentCannon.name].wheelColor}
                    wheelColorHighlight={colors[currentCannon.name].wheelColorHighlight}
                    scale={1}
                    displayName={currentCannon.displayName}
                    isOwned={1}
                  />
                </View>

                <ScrollView horizontal={true}>
                  {cannonArr && currentCannon && cannonArr.map((cannon, index) =>
                    // Pressable callback will only show modal if the cannon is not already owned
                    // else it will just set that cannon to current cannon
                    <Pressable
                      key={index}
                      onPress={() => console.log('pressable in cannon is working')}
                    >
                      <CannonLaunchDisplay
                        rotate={'-80deg'}
                        barrelColor={colors[cannon.name].barrel}
                        tipColor={colors[cannon.name].tip}
                        cannonBaseColor={colors[cannon.name].cannonBase}
                        cannonBallBolt={colors[cannon.name].cannonBallBolt}
                        cannonBallBoltHighlight={colors[cannon.name].cannonBallBoltHighlight}
                        wheelColor={colors[cannon.name].wheelColor}
                        wheelColorHighlight={colors[cannon.name].wheelColorHighlight}
                        scale={0.75}
                        displayName={cannon.displayName}
                        isOwned={cannon.isOwned}
                      />
                    </Pressable>
                  )}
                </ScrollView>
              </Card>
            </View>
          </View>
        }
      </ImageBackground>
    </>
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
    paddingTop: 5,
  },
  backIcon: {
    zIndex: 3
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  currentCannonBallAndStatsView: {
    flexDirection: 'row',
  }
})
