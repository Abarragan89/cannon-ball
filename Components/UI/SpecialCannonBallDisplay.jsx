import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SpecialCannonBallDisplay = ({
  gradientColor,
  adjustedCannonBallSize,
  size,
}) => {
  return (
    <>
      {/* EIGHT BALL */}
      {gradientColor === 'eightBall' &&
        <View
          style={{
            borderColor: '#3b3b3ba0',
            borderWidth: .5,
            width: adjustedCannonBallSize,
            height: adjustedCannonBallSize,
            borderRadius: adjustedCannonBallSize,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View style={styles.eightBallTextView}>
            <Text style={[styles.eightBallText,
            { fontSize: size === 11 ? 12 : 20 }
            ]}>8</Text>
          </View>
        </View>
      }
      {/* SKULL */}
      {gradientColor === 'skull' &&
        <View
          style={{
            borderColor: '#3b3b3ba0',
            borderWidth: .5,
            width: adjustedCannonBallSize,
            height: adjustedCannonBallSize,
            borderRadius: adjustedCannonBallSize,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View style={styles.skullContainer}>
            <Ionicons
              name="skull"
              // size 8 = in small slider
              // size 70 = in modal
              // else cannonball is in equipped display
              size={size === 8 ? 25 : size === 70 ? 65 : 50}
              color="white"
              style={{
                paddingBottom: 0.5
              }}
            />
          </View>
        </View>
      }
    </>
  )
}

export default SpecialCannonBallDisplay;

const styles = StyleSheet.create({
  eightBallTextView: {
    backgroundColor: colors.offWhite,
    borderRadius: 20,
    width: '45%',
    height: '45%',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  eightBallText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  }
})
