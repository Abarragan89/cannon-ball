import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import CannonBallDisplay from '../CannonBallDisplay';
import CannonLaunchDisplay from '../CannonLaunchDisplay';
import CannonBallStats from '../CannonBallStats';
import ModalBtn from '../ModalBtn';
import BaseModal from "./BaseModal";
import colors from '../../../constants/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const PurchaseModal = ({
  closeModal,
  itemInfo,
  setItemArray,
  userCoins,
  isCannonItemChange,
  SQLUpdateFn
}) => {
  const [confirmBuy, setConfirmBuy] = useState(false);

  return (
    <BaseModal closeModal={closeModal}>
      <Pressable onPress={closeModal} style={styles.closeModalPressable}>
        <FontAwesome name="close" size={24} color={colors.hinderanceColor} />
      </Pressable>
      {itemInfo &&
        <>
          <Text style={styles.itemTitle}>{itemInfo.name}</Text>
          <View style={styles.cannonDisplayAndDetailsContainer}>
          {/* Display Cannon Launch if click on a cannon */}
            {isCannonItemChange ?
              <CannonLaunchDisplay
                rotate={'-80deg'}
                barrelColor={colors[itemInfo.name].barrel}
                tipColor={colors[itemInfo.name].tip}
                cannonBaseColor={colors[itemInfo.name].cannonBase}
                cannonBallBolt={colors[itemInfo.name].cannonBallBolt}
                cannonBallBoltHighlight={colors[itemInfo.name].cannonBallBoltHighlight}
                wheelColor={colors[itemInfo.name].wheelColor}
                wheelColorHighlight={colors[itemInfo.name].wheelColorHighlight}
                scale={1}
                name={itemInfo.name}
                isOwned={itemInfo.isOwned}
              />
              :
              <>
              {/* Display Cannon Ball if clicked on Ball */}
                <View style={styles.cannonBallDisplayContainer}>
                  <CannonBallDisplay
                    color={itemInfo.color}
                    gradientColor={itemInfo.gradientColor}
                    size={70}
                    isOwned={1}
                    name={itemInfo.name}
                  />
                </View>
                <CannonBallStats
                  size={itemInfo.size}
                  weight={itemInfo.weight}
                  bounce={itemInfo.bounce}
                />
              </>
            }
          </View>
          {/* Only show the price if user has enough coins */}

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{itemInfo.price.toLocaleString()}</Text>
            <FontAwesome6 name="hockey-puck" size={18} color={colors.winningStar} />
          </View>

          {/* BUTTONS */}
          {
            confirmBuy ?
              <>
                <ModalBtn
                  text={'Confirm Purchase'}
                  handler={SQLUpdateFn}
                />
              </>
              :
              itemInfo.price > userCoins ?
                <ModalBtn
                  text={'Purchase'}
                  disabled={true}
                />
                :
                <ModalBtn
                  text={'Purchase'}
                  handler={() => setConfirmBuy(true)}
                />
          }
        </>
      }
    </BaseModal>
  )
}

export default PurchaseModal;

const styles = StyleSheet.create({
  closeModalPressable: {
    position: 'absolute',
    top: 5,
    right: 15,
  },
  itemTitle: {
    fontFamily: 'textFont',
    fontSize: 25,
  },
  cannonDisplayAndDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: 250,
    marginTop: 15
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceText: {
    fontFamily: 'textFont',
    fontSize: 21,
    color: colors.primaryBlack,
    marginRight: 10
  },
  confirmBuyText: {
    color: colors.offWhite,
    fontFamily: 'textFont',
    fontSize: 18
  }
})