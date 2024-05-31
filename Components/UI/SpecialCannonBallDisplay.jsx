import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
            { fontSize: size === 11 ? 12 : 20 }
            ]}>8</Text>
          </View>
        </View>
      }
      {/* SKULL */}
      {gradientColor === 'skull' &&
        <View
          style={{
            width: adjustedCannonBallSize,
            height: adjustedCannonBallSize,
            borderRadius: adjustedCannonBallSize,
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
              color="#0c0c01"
              style={{
                paddingBottom: 0.5
              }}
            />
          </View>
        </View>
      }
      {/* Ghost */}
      {gradientColor === 'ghost' &&
        <View
          style={{
            width: adjustedCannonBallSize,
            height: adjustedCannonBallSize,
            borderRadius: adjustedCannonBallSize,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View style={styles.skullContainer}>
            <MaterialCommunityIcons
              name="ghost"
              // size 11 = in small slider
              // size 60 = in modal
              // else cannonball is in equipped display
              size={size === 13 ? 40 : size === 70 ? 62 : 50}
              color="#8b89899a"
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
