import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import CannonBallDisplay from '../CannonBallDisplay';
import ModalBtn from '../ModalBtn';
import BaseModal from "./BaseModal"
import colors from '../../../constants/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const PurchaseModal = ({ closeModal, cannonBallInfo }) => {

  const [confirmBuy, setConfirmBuy] = useState(false);

  return (
    <BaseModal>
      <Pressable onPress={closeModal} style={styles.closeModalPressable}>
        <FontAwesome name="close" size={24} color={colors.hinderanceColor} />
      </Pressable>
      <Text style={styles.itemTitle}>{cannonBallInfo.title}</Text>
      <View style={[styles.cannonBallContainer]}>
        <CannonBallDisplay
          color={cannonBallInfo.color}
          gradientColor={cannonBallInfo.gradientColor}
          size={60}
        />
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{cannonBallInfo.price.toLocaleString()}</Text>
        <FontAwesome6 name="hockey-puck" size={18} color={colors.winningStar} />
      </View>
      {
        confirmBuy ?
          <>
            <ModalBtn
              text={'Confirm Purchase'}
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
    color: colors.primaryBlack
  },
  cannonBallContainer: {
    alignItems: 'center',
    backgroundColor: colors.offWhite,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  priceContainer: {
    flexDirection: 'row'
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