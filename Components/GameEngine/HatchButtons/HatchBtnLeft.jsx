import { View, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../../../constants/colors";

const HatchBtnLeft = ({ position, color, topPosition, leftPosition }) => {
  return (
    <View style={[styles.root, {
      left: position[0],
      top: position[1],
    }]}>
      <View style={[styles.box, {
        backgroundColor: color
      }
      ]}>
        <AntDesign style={{
          paddingLeft: 2,
          paddingTop: 3
        }} name="arrowleft" size={33} color={colors.offWhite} />
      </View>
      <View
        style={[styles.btnTop, {
          left: leftPosition
        }]}
      />
    </View>
  )
}

export default HatchBtnLeft;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    display: 'block',
  },
  box: {
    height: 40,
    width: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primaryBlack
  },
  btnTop: {
    position: 'absolute',
    left: -11,
    top: 4.5,
    height: 30,
    width: 15,
    backgroundColor: colors.silverStar,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    zIndex: -1
  }
})