import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import CannonBallDisplay from '../CannonBallDisplay';
import ModalBtn from '../ModalBtn';
import BaseModal from "./BaseModal";
import ProgressSquares from '../ProgressSquares';
import colors from '../../../constants/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {
  updateUserCurrentCannonBall,
  updateUserCannonBallSet
} from '../../../db/updateQueries';

const PurchaseModal = ({ closeModal, cannonBallInfo, setCannonBallArr, setCurrentCannonBall }) => {

  const [confirmBuy, setConfirmBuy] = useState(false);

  // update current cannon ball of user
  async function handlerUpdateCurrentCannonBall(cannonBallName) {
    try {
      await updateUserCurrentCannonBall(1, cannonBallName)
      setCurrentCannonBall(cannonBallName);
      closeModal();
    } catch (error) {
      console.log('error updating user cannonBall ', error)
    }
  }

  async function handleUpdateUserCannonBallSet(cannonBallId) {
    try {
      await updateUserCannonBallSet(cannonBallId);
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
      closeModal();
    } catch (error) {
      console.log('error updating cannon ball set ', error)
    }
  }

  return (
    <BaseModal>
      <Pressable onPress={closeModal} style={styles.closeModalPressable}>
        <FontAwesome name="close" size={24} color={colors.hinderanceColor} />
      </Pressable>
      <Text style={styles.itemTitle}>{cannonBallInfo.name}</Text>

      <View style={styles.cannonDisplayAndDetailsContainer}>
        <View style={styles.cannonBallDisplayContainer}>
          <CannonBallDisplay
            color={cannonBallInfo.color}
            gradientColor={cannonBallInfo.gradientColor}
            size={85}
            isOwned={cannonBallInfo.isOwned}
          />
        </View>
        <View style={styles.cannonDetails}>
          <View>
            <Text style={styles.statText}>Size</Text>
            <ProgressSquares squareCount={5} />
            <Text style={styles.statText}>Weight</Text>
            <ProgressSquares squareCount={3} />
            <Text style={styles.statText}>Bounce</Text>
            <ProgressSquares squareCount={1} />
          </View>
        </View>
      </View>
      {!cannonBallInfo.isOwned &&
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{cannonBallInfo.price.toLocaleString()}</Text>
          <FontAwesome6 name="hockey-puck" size={18} color={colors.winningStar} />
        </View>
      }

      {/* BUTTONS */}
      {
        confirmBuy ?
          <>
            <ModalBtn
              text={'Confirm Purchase'}
              handler={() => handleUpdateUserCannonBallSet(cannonBallInfo.id)}
            />
          </>
          :
          cannonBallInfo.isOwned ?
            <ModalBtn
              text={'Equip'}
              handler={() => handlerUpdateCurrentCannonBall(cannonBallInfo.name)}
            />
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 250,
    marginVertical: 15
  },
  statText: {
    margin: 0,
    fontFamily: 'textFont',
    color: colors.offWhite,
    fontSize: 17
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