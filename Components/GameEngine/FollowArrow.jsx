import { View, StyleSheet, Image } from "react-native"
import { Dimensions } from "react-native";
import { Foundation } from '@expo/vector-icons';


import colors from "../../constants/colors";


const screenHeight = Dimensions.get('window').height;

const FollowArrow = ({ leftPosition, displayStatus }) => {
  
    return (
    <View style={[styles.root, {
        left: leftPosition,
        top: 0,
        display: displayStatus
    }]}>
        <Foundation name="arrow-up" size={24} color={colors.primaryBrown} />
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
