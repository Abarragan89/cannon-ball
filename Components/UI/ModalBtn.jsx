import { StyleSheet, Text, Pressable } from 'react-native';
import colors from '../../constants/colors';

const ModalBtn = ({ handler, text, disabled }) => {

    if (disabled) {
        return (
            <Pressable style={[styles.confirmBtn, disabled && { opacity: 0.3, borderColor: '#3e3b3b' }]} onPress={handler}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        )
    }

    return (
        <Pressable style={({ pressed }) => [styles.confirmBtn, pressed && styles.confirmBtnPressed]} onPress={handler}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

export default ModalBtn;

const styles = StyleSheet.create({
    confirmBtn: {
        marginTop: 10,
        backgroundColor: colors.hinderanceColor,
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
        paddingHorizontal: 15,
        color: colors.offWhite
    },
    confirmBtnPressed: {
        elevation: 0,
        shadowRadius: 0,
        backgroundColor: colors.primaryBlack
    },
    disabledBtn: {
        elevation: 0,
        shadowOpacity: 0,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 0,
        backgroundColor: 'gray',
        borderColor: '#898989f4',
        color: colors.primaryBlack
    },
    disabledText: {
        color: '#cdc4c4aa'
    }
})
