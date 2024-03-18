import { View, StyleSheet } from 'react-native'
import colors from '../../constants/colors';

const HatchBox = ({ position }) => {
  return (
    <View style={[styles.borderStyles, {
        left: position[0],
        top: position[1]
    }]}>
        <View style={styles.transparentBox}>
        </View>
    </View>

  )
}

export default HatchBox;


const styles = StyleSheet.create({
    borderStyles: {
        position: 'absolute',
        borderLeftWidth: 7, 
        borderRightWidth: 7, 
        borderBottomWidth: 7,
        borderColor: colors.sandColor
    },
    transparentBox: {
        width: 43,
        height: 48,
        backgroundColor: '#0f520f00'
    }
})
