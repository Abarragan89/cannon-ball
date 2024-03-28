import { View, StyleSheet } from "react-native"
import colors from "../../../constants/colors";

const LongHind = ({ position }) => {
  return (
    <View 
        style={[styles.root, {
            left: position[0],
            top: position[1],
        }]}
        
    />
  )
}

export default LongHind;

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        display: 'block',
        height: 30,
        width: 120,
        backgroundColor: colors.hinderanceColor,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.primaryBlack
    }
})
