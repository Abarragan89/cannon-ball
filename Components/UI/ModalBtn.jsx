import { StyleSheet, Text, Pressable } from 'react-native';
import colors from '../../constants/colors';

const ModalBtn = ({ handler, text }) => {
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
    },
})
