import { View, StyleSheet } from "react-native"
import colors from "../../../constants/colors";

const TallHind = ({ position }) => {
  return (
    <View 
        style={[styles.root, {
            left: position[0],
            top: position[1],
        }]}
        
    />
  )
}

export default TallHind;

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        display: 'block',
        height: 120,
        width: 30,
        backgroundColor: colors.sandColor,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.primaryBlack
    }
})
