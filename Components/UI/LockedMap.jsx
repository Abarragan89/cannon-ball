import { StyleSheet, ImageBackground } from 'react-native';

const LockedMap = ({ starsNeeded, imgSrc }) => {
    return (
        <>
            <ImageBackground
                style={[
                    styles.backgroundImage
                ]}
                source={imgSrc}
            >
            </ImageBackground>
        </>
    )
}

export default LockedMap;

const styles = StyleSheet.create({
    backgroundImage: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        width: 170,
        height: 50,
        alignItems: 'center',
    },
    pressed: {
        elevation: 0,
        borderTopWidth: 0,
        borderRadius: 2,
        borderBottomWidth: 2,
        transform: [{ translateY: 1 }]
    }
})
