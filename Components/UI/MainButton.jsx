import { router } from 'expo-router';
import { StyleSheet, Pressable, Text, ImageBackground } from 'react-native';
import colors from '../../constants/colors';

const MainButton = ({ children, route, params, runFunc, imgSrc }) => {
    // if runFunc is passed, then we don't want to link to a new page, but run a function
    const onPressHandler = runFunc ? runFunc : () => router.push({ pathname: route, params: params });

    return (
        <>
            <Pressable onPress={onPressHandler} style={({ pressed }) =>
                [styles.parentPress, pressed && styles.pressed]
            }>
                <ImageBackground
                    style={[
                        styles.backgroundImage
                    ]}
                    source={imgSrc}
                >
                    <Text style={[styles.text]}>
                        {children}
                    </Text>
                </ImageBackground>
            </Pressable>
        </>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    parentPress: {
        borderBottomWidth: 5,
        borderColor: '#422503',
        marginHorizontal: 20,
        marginBottom: 30,
        borderRadius: 10
    },
    backgroundImage: {
        paddingVertical: 8,
        paddingHorizontal: 40,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .7,
        shadowRadius: 4,
    },
    text: {
        fontSize: 28,
        fontFamily: 'textFont',
        color: colors.offWhite
    },
    pressed: {
        elevation: 0,
        borderTopWidth: 0,
        borderRadius: 2,
        borderBottomWidth: 2,
        transform: [{ translateY: 1 }]
    }
})
