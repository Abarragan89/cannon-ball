import { View, Text, StyleSheet, Image } from "react-native"
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get('window').height;

const FollowArrow = ({ leftPosition, displayStatus }) => {
  
    return (
    <View style={[styles.root, {
        left: leftPosition,
        top: -5,
        display: displayStatus
    }]}>
        <Image style={styles.image} source={require('../../assets/images/followArrow.png')} />
    </View>
  )
}

export default FollowArrow;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        position: 'absolute'
    },
    image: {
        width: 20,
        height: 20
    }
})
