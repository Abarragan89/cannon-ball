import { StyleSheet, ImageBackground, Pressable } from 'react-native';

const LockedMap = ({ imgSrc, showModal, setShowModal }) => {

    return (
        <>
        <Pressable onPress={() => setShowModal(true)}
            style={({ pressed }) => [styles.parentPress, pressed && styles.pressed]}
        >
            <ImageBackground
                style={[
                    styles.backgroundImage
                ]}
                source={imgSrc}
            >
            </ImageBackground>
        </Pressable>
        </>
    )
}

export default LockedMap;

const styles = StyleSheet.create({
    parentPress: {
        borderBottomWidth: 5,
        borderColor: '#422503',
        marginHorizontal: 20,
        marginBottom: 30,
        borderRadius: 10
    },
    backgroundImage: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        width: 180,
        height: 50,
        alignItems: 'center',
    },
    pressed: {
        elevation: 0,
        borderTopWidth: 0,
        borderRadius: 2,
        borderBottomWidth: 2,
        transform: [{ translateY: 1 }]
    },
})
