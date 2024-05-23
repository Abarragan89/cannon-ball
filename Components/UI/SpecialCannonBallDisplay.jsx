import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
            { fontSize: size === 11 ? 12 : 16 }
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
            <MaterialCommunityIcons name="skull-crossbones" size={50} color={colors.offWhite} />
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
    marginBottom: 5
  },
  eightBallText: {
    marginTop: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  }
})
