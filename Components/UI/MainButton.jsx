import { router } from 'expo-router';
import { StyleSheet, Pressable, Text } from 'react-native';
import colors from '../../constants/colors';

const MainButton = ({ children, route, params, runFunc }) => {
    // if runFunc is passed, then we don't want to link to a new page, but run a function
    const onPressHandler = runFunc ? runFunc : () => router.navigate(route, params);

    return (
        <Pressable onPress={onPressHandler} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
            <Text style={styles.text}>
                {children}
            </Text>
        </Pressable>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderWidth: 1, 
        paddingVertical: 5,
        paddingHorizontal: 25,
        backgroundColor: colors.primaryYellow,
        borderRadius: 8
    },
    text: {
        fontSize: 16
    },
    pressed: {
        opacity: 0.7
    }
})
