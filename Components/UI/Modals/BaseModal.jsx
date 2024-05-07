import { StyleSheet, View } from 'react-native';
import colors from '../../../constants/colors';


const BaseModal = ({ children }) => {
    return (
        <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
                {children}
            </View>
        </View>
    )
}

export default BaseModal;

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
    modalContainer: {
        minWidth: 300,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.sandColor,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
    },
})
