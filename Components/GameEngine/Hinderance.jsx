import { View, StyleSheet } from "react-native"
import colors from "../../constants/colors";

const Hinderance = ({ position, width, height, color }) => {
  return (
    <View 
        style={[styles.root, {
            left: position[0],
            top: position[1],
            width: width,
            height: height,
            backgroundColor: color ? color : colors.hinderanceColor
        }]}
        
    />
  )
}

export default Hinderance;

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        display: 'block',
        height: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.primaryBlack
    }
})
