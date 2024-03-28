import { View, StyleSheet } from 'react-native';

const GiantTallHind = ({ position }) => {
  return (
    <View 
         style={[styles.root, {
            left: position[0],
            top: position[1],
        }]}

    />
  )
}

export default GiantTallHind

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        display: 'block',
        height: 300,
        width: 70,
        backgroundColor: colors.hinderanceColor,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.primaryBlack
    }
})