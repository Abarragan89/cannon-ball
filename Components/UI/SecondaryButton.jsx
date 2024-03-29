import { router } from 'expo-router';
import { StyleSheet, Pressable, Text } from 'react-native';
import colors from '../../constants/colors';

const SecondaryButton = ({ children, route, params, runFunc }) => {
    // if runFunc is passed, then we don't want to link to a new page, but run a function
    const onPressHandler = runFunc ? runFunc : () => router.replace({ pathname: route, params: params });

    return (
        <Pressable onPress={onPressHandler} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
                <Text style={styles.text}>
                    {children}
                </Text>
        </Pressable>
    )
}

export default SecondaryButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.skyColor,
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderRadius: 8,
        // elevation: 3,
        // shadowColor: 'black',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: .7,
        // shadowRadius: 3,
    },
    text: {
        fontSize: 23,
        fontFamily: 'textFont',
        color: colors.sandColor
    },
    pressed: {
        opacity: .9,
        elevation: 0
    }
})
