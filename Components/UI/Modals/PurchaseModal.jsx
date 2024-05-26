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

const PurchaseModal = ({ closeModal, cannonBallInfo, setCannonBallArr }) => {

  const [confirmBuy, setConfirmBuy] = useState(false);
  const [cannonBallInfoState, setCannonBallInfoState] = useState(cannonBallInfo);

  async function handleUpdateUserCannonBallSet(cannonBallId) {
    try {
      await updateUserCannonBallSet(cannonBallId);
      // deduct coins from the user for purchase
      await updateUserCoins(1, cannonBallInfo.price)
      setCannonBallArr(cannonBallArr => cannonBallArr.map((cannonBall) => {
        if (cannonBall.name === cannonBallInfo.name) {
          return {
            ...cannonBall,
            isOwned: 1
          }
        } else {
          return cannonBall
        }
      }))
      setCannonBallInfoState(prev => ({ ...prev, isOwned: 1 }));
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
      {cannonBallInfoState &&
        <>
          <Text style={styles.itemTitle}>{cannonBallInfoState.name}</Text>

          <View style={styles.cannonDisplayAndDetailsContainer}>
            <View style={styles.cannonBallDisplayContainer}>
              <CannonBallDisplay
                color={cannonBallInfoState.color}
                gradientColor={cannonBallInfoState.gradientColor}
                size={70}
                isOwned={cannonBallInfoState.isOwned}
                name={cannonBallInfoState.name}
              />
            </View>
            <CannonBallStats
              size={cannonBallInfoState.size}
              weight={cannonBallInfoState.weight}
              bounce={cannonBallInfoState.bounce}
            />
          </View>
        </>
      }
      {!cannonBallInfoState.isOwned &&
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{cannonBallInfoState.price.toLocaleString()}</Text>
          <FontAwesome6 name="hockey-puck" size={18} color={colors.winningStar} />
        </View>
      }

      {/* BUTTONS */}
      {
        confirmBuy ?
          <>
            <ModalBtn
              text={'Confirm Purchase'}
              handler={() => handleUpdateUserCannonBallSet(cannonBallInfoState.id)}
            />
          </>
          :
          <ModalBtn
            text={'Purchase'}
            handler={() => setConfirmBuy(true)}
          />
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
    marginVertical: 15
  },
  priceContainer: {
    flexDirection: 'row',
  },
  priceText: {
    fontFamily: 'textFont',
    fontSize: 23,
    color: colors.primaryBlack,
    marginRight: 10
  },
  confirmBuyText: {
    color: colors.offWhite,
    fontFamily: 'textFont',
    fontSize: 18
  }
})