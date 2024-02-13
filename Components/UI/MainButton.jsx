import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Pressable, Text, ImageBackground } from 'react-native';
import colors from '../../constants/colors';


const MainButton = ({ children, route, params, runFunc, top, left }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    // if runFunc is passed, then we don't want to link to a new page, but run a function
    const onPressHandler = runFunc ? runFunc : () => router.push({ pathname: route, params: params });

    return (
        <Pressable onPress={onPressHandler} style={({ pressed }) => 
        [styles.parentPress, pressed && styles.pressed]
        }>
            <ImageBackground
                style={[
                    isImageLoaded ? {} : {display: 'none'},
                    styles.backgroundImage
                    ]}
                source={require('../../assets/images/btnWoodBg.png')}
                onLoad={() => setIsImageLoaded(true)}
            >
                <Text style={[styles.text]}>
                    {children}
                </Text>
            </ImageBackground>
        </Pressable>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    parentPress: {
        borderRadius: 2,
        borderTopWidth: 5,
        borderColor: '#2a2727',
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
        shadowRadius: 8,
    },
    text: {
        fontSize: 25,
        fontFamily: 'textFont',
        color: colors.offWhite
    },
    pressed: {
        elevation: 0,
        borderTopWidth: 0,
        transform: [{ translateY: -1}]
    }
})
