import { View, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../../../constants/colors";

const HatchBtnTop = ({ position, color, topPosition }) => {
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
        }} name="arrowdown" size={33} color={colors.offWhite} />
      </View>
      <View
        style={[styles.btnTop, {
          top: topPosition
        }]}
      />
    </View>
  )
}

export default HatchBtnTop;

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
    left: 5,
    height: 15,
    width: 30,
    backgroundColor: colors.silverStar,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    zIndex: -1
  }
})