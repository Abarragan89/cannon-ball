import { View, StyleSheet } from "react-native";

const HatchBtnTop = ({ position, color, topPosition }) => {
  return (
    <View style={[styles.root, {
      left: position[0],
      top: position[1],
    }]}>
      <View style={[styles.box, {
        backgroundColor: color
      }
      ]} />
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
    left: 4,
    height: 15,
    width: 30,
    backgroundColor: colors.primaryBlack,
    borderRadius: 4,
    zIndex: -1
  }
})