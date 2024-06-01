import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Title from "../../Components/UI/Title";
import BackArrow from "../../Components/UI/BackArrow";
import Card from "../../Components/UI/Card";
import colors from "../../constants/colors";
import CannonBallStats from "../../Components/UI/CannonBallStats";
import CannonStats from "../../Components/UI/CannonStats";
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
import {
  updateUserCurrentCannonBall,
  updateUserCurrentCannon,
  updateUserCannonSet,
  updateUserCannonBallSet,
  updateUserCoins
} from "../../db/updateQueries";

const StoreScreen = () => {

  const [cannonBallArr, setCannonBallArr] = useState([]);
  const [cannonArr, setCannonArr] = useState([]);
  const [currentCannonBall, setCurrentCannonBall] = useState(null);
  const [currentCannon, setCurrentCannon] = useState(null);
  const [userCoins, setUserCoins] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [refreshCoins, setRefreshCoins] = useState(false)
  const isCannonItemChange = useRef();
  const closeModal = () => setShowItemModal(false);


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

  const displayModal = (itemInfo, isCannonItem) => {
    // this variable is used to conditionally render the Purchase Modal
    // depending on what type of item the user is buying (cannon or cannonBalls)
    isCannonItemChange.current = isCannonItem
    setCurrentItem(itemInfo);
    setShowItemModal(true);
  }

  // // update current cannon ball of user
  async function handleUpdateCurrentItem(item, itemSQLUpdateFn, setItemState) {
    try {
      //  Only need the name to update it in preferences
      await itemSQLUpdateFn(1, item.name)
      // Need to set the entire object in currentCannonBall
      setItemState(item);
      closeModal();
    } catch (error) {
      console.log('error updating user cannonBall ', error)
    }
  };

  async function handlePurchaseNewItem(itemInfo, itemSQLUpdateFn, setItemArray) {
    try {
      await itemSQLUpdateFn(itemInfo.id);
      // deduct coins from the user for purchase
      await updateUserCoins(1, itemInfo.price);
      // Update the itemArray so it will rerender on screen
      setItemArray(singleItem => singleItem.map((item) => {
        if (item.name === itemInfo.name) {
          return {
            ...item,
            isOwned: 1
          }
        } else {
          return item
        }
      }))
      setRefreshCoins([prev => !prev])
      closeModal();
    } catch (error) {
      console.log('error updating cannon ball set ', error)
    }
  }

  return (
    <>
      <StatusBar hidden={true} />
      <UserAllTimeNavStats refresh={refreshCoins} />
      <ImageBackground
        source={require('../../assets/images/screenWoodBg.png')}
        style={styles.rootContainer}
      >
        {showItemModal &&
          <PurchaseModal
            closeModal={closeModal}
            itemInfo={currentItem}
            setItemArray={isCannonItemChange.current ? setCannonArr : setCannonBallArr}
            userCoins={userCoins}
            isCannonItemChange={isCannonItemChange.current}
            SQLUpdateFn={isCannonItemChange.current ?
              () => handlePurchaseNewItem(currentItem, updateUserCannonSet, setCannonArr)
              :
              () => handlePurchaseNewItem(currentItem, updateUserCannonBallSet, setCannonBallArr)}
          />
        }
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
                      onPress={() => cannonBall.isOwned ?
                        handleUpdateCurrentItem(cannonBall, updateUserCurrentCannonBall, setCurrentCannonBall)
                        :
                        displayModal(cannonBall, false)}
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
                <View style={styles.currentCannonView}>
                  <CannonLaunchDisplay
                    rotate={'-80deg'}
                    barrelColor={colors[currentCannon.name].barrel}
                    tipColor={colors[currentCannon.name].tip}
                    cannonBaseColor={colors[currentCannon.name].cannonBase}
                    cannonBallBolt={colors[currentCannon.name].cannonBallBolt}
                    cannonBallBoltHighlight={colors[currentCannon.name].cannonBallBoltHighlight}
                    wheelColor={colors[currentCannon.name].wheelColor}
                    wheelColorHighlight={colors[currentCannon.name].wheelColorHighlight}
                    scale={.9}
                    isEquipped={true}
                    name={currentCannon.name}
                    isOwned={1}
                  />
                  <CannonStats
                    power={currentCannon.power}
                  />
                </View>

                <ScrollView horizontal={true}>
                  {cannonArr && currentCannon && cannonArr.map((cannon, index) =>
                    // Pressable callback will only show modal if the cannon is not already owned
                    // else it will just set that cannon to current cannon
                    <Pressable
                      key={index}
                      onPress={() => cannon.isOwned ?
                        handleUpdateCurrentItem(cannon, updateUserCurrentCannon, setCurrentCannon)
                        :
                        displayModal(cannon, true)}
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
                        isEquipped={cannon.name === currentCannon.name}
                        scale={0.7}
                        name={cannon.name}
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
  },
  currentCannonView: {
    flexDirection: 'row',
  }
})
