import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  Pressable,
  Text
} from "react-native";
import { useState, useEffect } from "react";
import Title from "../../Components/UI/Title";
import BackArrow from "../../Components/UI/BackArrow";
import Card from "../../Components/UI/Card";
import colors from "../../constants/colors";
import CannonBallStats from "../../Components/UI/CannonBallStats";
import CannonBallDisplay from "../../Components/UI/CannonBallDisplay";
import CannonLaunchDisplay from "../../Components/UI/CannonLaunchDisplay";
import CannonLauncher from "../../Components/GameEngine/CannonLauncher";
import UserAllTimeNavStats from "../../Components/UI/UserAllTimeNavStats";
import PurchaseModal from "../../Components/UI/Modals/PurchaseModal";
import { getUserCannonBalls, getUserDataPreferences, getUserTotalPoints } from "../../db/selectQueries";
import { updateUserCurrentCannonBall } from "../../db/updateQueries";

const StoreScreen = () => {

  const [cannonBallArr, setCannonBallArr] = useState([]);
  const [currentCannonBall, setCurrentCannonBall] = useState(null);
  const [userCoins, setUserCoins] = useState(null)
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

        // Get user Coins to pass to Purchase Modal
        const [{ totalPoints }] = await getUserTotalPoints(1);
        setUserCoins(totalPoints)

      } catch (error) {
        console.log('error getting cannonBall set ', error)
      }
    }
    getCannonBalls();


    function generateCannonLaunchers(colors) {

    }
  }, [])

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
                  <View style={[styles.cardContainer, { flexDirection: 'row' }]}>
                    <View style={styles.cannonLaunchContainer}>
                      <CannonLaunchDisplay
                        rotate={'-50deg'}
                        tipColor={'black'}
                        barrelColor={'#1e1e1e'}
                        cannonBaseColor={colors.primaryBrown}
                        cannonBallBolt={'#151010'}
                        cannonBallBoltHighlight={'#383434'}
                        wheelColor={'#383232'}
                        wheelColorHighlight={'#7d7373'}
                        scale={0.75}
                      />
                    </View>
                    <View style={styles.cannonLaunchContainer}>
                      <CannonLaunchDisplay

                        rotate={'-50deg'}
                        barrelColor={'#1e1e1e'}
                        tipColor={'black'}
                        cannonBaseColor={colors.primaryBrown}
                        cannonBallBolt={'#151010'}
                        cannonBallBoltHighlight={'#383434'}
                        wheelColor={'#383232'}
                        wheelColorHighlight={'#7d7373'}
                        scale={0.75}
                      />
                    </View>
                    <View style={styles.cannonLaunchContainer}>
                      <CannonLaunchDisplay
                        rotate={'-50deg'}
                        barrelColor={'#1e1e1e'}
                        tipColor={'black'}
                        cannonBaseColor={colors.primaryBrown}
                        cannonBallBolt={'#151010'}
                        cannonBallBoltHighlight={'#383434'}
                        wheelColor={'#383232'}
                        wheelColorHighlight={'#7d7373'}
                        scale={0.75}
                      />
                    </View>
                  </View>
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
    flexDirection: 'row'
  },
  cannonLaunchContainer: {
    position: 'relative',
    flex: 1
  }
})
