import { View, StyleSheet } from "react-native"
import colors from "../../../constants/colors";
import { Dimensions } from "react-native";
const { width } = Dimensions.get('window')

const ExtraLongHind = ({ position }) => {
  return (
    <View 
        style={[styles.root, {
            left: position[0],
            top: position[1],
            width: width + 10
        }]}
        
    />
  )
}

export default ExtraLongHind;

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        display: 'block',
        height: 10,
        width: 300,
        backgroundColor: colors.sandColor,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.primaryBlack
    }
})
