import { View, StyleSheet } from "react-native"

const Hinderance = ({ position }) => {
  return (
    <View 
        style={[styles.root, {
            left: position[0],
            top: position[1],
        }]}
        
    />
  )
}

export default Hinderance;

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        display: 'block',
        height: 30,
        width: 30,
        backgroundColor: 'red',
    }
})
