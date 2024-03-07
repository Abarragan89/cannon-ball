import { View, StyleSheet } from "react-native"
import colors from "../../constants/colors";

const HatchLid = ({ position }) => {
  return (
    <View 
        style={[styles.root, {
            left: position[0],
            top: position[1],
        }]}
        
    />
  )
}

export default HatchLid;

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        display: 'block',
        height: 15,
        width: 57,
        backgroundColor: colors.sandColor,
        // borderWidth: 1,
        borderColor: colors.primaryBlack
    }
})
