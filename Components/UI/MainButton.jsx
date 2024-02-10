import { router } from 'expo-router';
import { StyleSheet, Pressable, Text, ImageBackground } from 'react-native';
import colors from '../../constants/colors';

const MainButton = ({ children, route, params, runFunc }) => {
    // if runFunc is passed, then we don't want to link to a new page, but run a function
    const onPressHandler = runFunc ? runFunc : () => router.push({ pathname: route, params: params });

    return (
        <Pressable onPress={onPressHandler} style={({ pressed }) => [pressed && styles.pressed]}>
            <ImageBackground
                style={styles.container}
                source={require('../../assets/images/btnWoodBg.png')}
            >
                <Text style={styles.text}>
                    {children}
                </Text>
            </ImageBackground>
        </Pressable>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 8,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .7,
        shadowRadius: 3,

    },
    text: {
        fontSize: 24,
        fontFamily: 'textFont',
        color: colors.background
    },
    pressed: {
        opacity: .9,
        elevation: 0
    }
})
