import { StyleSheet, Pressable } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from "../../constants/colors";
import { router } from 'expo-router';


const BackArrow = () => {
    return (
        <Pressable onPress={() => router.back()} style={styles.root}>
                <Ionicons name='arrow-back' size={40} color={colors.primaryYellow} />
        </Pressable>
    )
}

export default BackArrow;

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        marginLeft: 15,
        marginTop: 10,
    }
})