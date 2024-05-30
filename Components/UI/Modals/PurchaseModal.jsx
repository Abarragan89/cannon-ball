import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import CannonBallDisplay from '../CannonBallDisplay';
import CannonBallStats from '../CannonBallStats';
import ModalBtn from '../ModalBtn';
import BaseModal from "./BaseModal";
import colors from '../../../constants/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { updateUserCannonBallSet, updateUserCoins } from '../../../db/updateQueries';

const PurchaseModal = ({ closeModal, itemInfo, setItemArray, userCoins }) => {

  const [confirmBuy, setConfirmBuy] = useState(false);
  const [itemInfoState, setItemInfoState] = useState(itemInfo);

  async function handleUpdateUserCannonBallSet(itemId) {
    try {
      await updateUserCannonBallSet(itemId);
      // deduct coins from the user for purchase
      await updateUserCoins(1, itemInfo.price)
      setItemArray(itemInfoState => itemInfoState.map((item) => {
        if (item.name === itemInfo.name) {
          return {
            ...item,
            isOwned: 1
          }
        } else {
          return item
        }
      }))
      setItemInfoState(prev => ({ ...prev, isOwned: 1 }));
      closeModal();
    } catch (error) {
      console.log('error updating cannon ball set ', error)
    }
  }

  return (
    <BaseModal closeModal={closeModal}>
      <Pressable onPress={closeModal} style={styles.closeModalPressable}>
        <FontAwesome name="close" size={24} color={colors.hinderanceColor} />
      </Pressable>
      {itemInfoState &&
        <>
          <Text style={styles.itemTitle}>{itemInfoState.name}</Text>
          <View style={styles.cannonDisplayAndDetailsContainer}>
            <View style={styles.cannonBallDisplayContainer}>
              <CannonBallDisplay
                color={itemInfoState.color}
                gradientColor={itemInfoState.gradientColor}
                size={70}
                isOwned={1}
                name={itemInfoState.name}
              />
            </View>
            <CannonBallStats
              size={itemInfoState.size}
              weight={itemInfoState.weight}
              bounce={itemInfoState.bounce}
            />
          </View>
          {/* Only show the price if user has enough coins */}

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{itemInfoState.price.toLocaleString()}</Text>
            <FontAwesome6 name="hockey-puck" size={18} color={colors.winningStar} />
          </View>

          {/* BUTTONS */}
          {
            confirmBuy ?
              <>
                <ModalBtn
                  text={'Confirm Purchase'}
                  handler={() => handleUpdateUserCannonBallSet(itemInfoState.id)}
                />
              </>
              :
              itemInfoState.price > userCoins ?
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