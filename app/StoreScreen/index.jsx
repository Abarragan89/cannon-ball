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
import { getUserCannonBalls } from "../../db/selectQueries";


const StoreScreen = () => {

  // const cannonBallArr = [
  //   {
  //     color: 'black',
  //     gradientColor: 'rgba(52, 51, 51, 1)',
  //     price: 20000,
  //     title: 'Classic Black'
  //   },
  //   {
  //     color: 'red',
  //     gradientColor: '#fc8686ff',
  //     price: 25000,
  //     title: 'Red Raider'
  //   },
  //   {
  //     color: 'orange',
  //     gradientColor: '#ffcd70',
  //     price: 45000,
  //     title: 'Orange Outlaw'
  //   },
  //   {
  //     color: '#c3c30f',
  //     gradientColor: '#f9f9b2',
  //     price: 60000,
  //     title: 'Yellow Fellow'
  //   },
  //   {
  //     color: 'green',
  //     gradientColor: '#6ef96e',
  //     price: 70000,
  //     title: 'Greedy Green'
  //   },
  //   {
  //     color: 'purple',
  //     gradientColor: '#d065d0',
  //     price: 80000,
  //     title: 'Purple Pirate'
  //   },
  // ]

  const [cannonBallArr, setCannonBallArr] = useState([])
  const [showItemModal, setShowItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const closeModal = () => setShowItemModal(false);

  const displayModal = (itemInfo) => {
    setCurrentItem(itemInfo);
    setShowItemModal(true)
  }

  // Get User's Cannon balls
  useEffect(() => {
    async function getCannonBalls() {
      const cannonBallSet = await getUserCannonBalls(1);
      setCannonBallArr(cannonBallSet)
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
              {cannonBallArr && cannonBallArr.map((cannonBall, index) => 
                <Pressable key={index} onPress={() => displayModal(cannonBall)}>
                  <View style={[styles.cannonBallContainer]}>
                    <CannonBallDisplay
                      color={cannonBall.color}
                      gradientColor={cannonBall.gradientColor}
                      size={45}
                    />
                  </View>
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
    paddingTop: 15
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cannonBallContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryBlack,
    borderRadius: 8,
    padding: 5,
    marginHorizontal: 10
  },
})
