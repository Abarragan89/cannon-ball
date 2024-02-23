import { View, StyleSheet } from "react-native"
import colors from "../../../constants/colors";

const SmallSquareHind = ({ position }) => {
  return (
    <View 
        style={[styles.root, {
            left: position[0],
            top: position[1],
        }]}
        
    />
  )
}

export default SmallSquareHind;

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        display: 'block',
        height: 40,
        width: 40,
        backgroundColor: colors.sandColor,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.primaryBlack
    }
})
