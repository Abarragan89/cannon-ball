import { StyleSheet, View, Text, Pressable } from 'react-native';
import colors from '../../constants/colors';


const InfoModal = ({ starsNeeded, showModal, setShowModal }) => {
    return (
        <View style={styles.modalBackdrop}>
            <View style={styles.modalMessageContainer}>
                <Text style={[styles.text, styles.messageText]}>Collect {starsNeeded} stars to unlock!</Text>
                <Pressable style={({ pressed }) => [styles.confirmBtn, pressed && styles.confirmBtnPressed]} onPress={() => setShowModal(false)}>
                    <Text style={styles.text}>Ok</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default InfoModal;

const styles = StyleSheet.create({
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.424)',
        zIndex: 5
    },
    modalMessageContainer: {
        justifyContent: 'center',
        backgroundColor: colors.sandColor,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
    },
    confirmBtn: {
        marginTop: 10,
        backgroundColor: colors.hinderanceColor,
        marginHorizontal: 60,
        borderWidth: 1,
        borderColor: colors.primaryBlack,
        borderRadius: 8,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .5,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    text: {
        fontSize: 20,
        fontFamily: 'textFont',
        textAlign: 'center',
        paddingVertical: 5,
        color: colors.offWhite
    },
    messageText: {
        color: colors.primaryBlack
    },
    confirmBtnPressed: {
        elevation: 0,
        shadowRadius: 0,
    },
    pressed: {
        elevation: 0,
        borderTopWidth: 0,
        borderRadius: 2,
        borderBottomWidth: 2,
        transform: [{ translateY: 1 }]
    },
})
