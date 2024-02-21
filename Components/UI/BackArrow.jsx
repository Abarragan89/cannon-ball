import { StyleSheet, Pressable } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from "../../constants/colors";
import { router } from 'expo-router';


const BackArrow = ({ route, params }) => {

    // if you need to return to a specifc route, or just go back in history 
    // if route is not provided.
    const onPressHandler = route ? () => router.navigate({ pathname: route, params: params}) : () => router.back()

    return (
        <Pressable onPress={onPressHandler} style={styles.root}>
                <Ionicons name='arrow-back' size={40} color={colors.offWhite} />
        </Pressable>
    )
}

export default BackArrow;

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        marginLeft: 15,
        marginTop: 15
    }
})