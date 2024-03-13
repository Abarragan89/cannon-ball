import { Text, View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const FireBtn = ({ isShooting }) => {

    return (
        <View style={[styles.root, isShooting && {
            backgroundColor: colors.offWhite,
        }]}>
                <Text style={[styles.text, isShooting && {
                    color: colors.primaryBlack
                }]}>{isShooting ? 'Reset' : 'Fire'}</Text>
        </View>
    )
}

export default FireBtn;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 65,
        right: 70,
        pointerEvents: 'none',
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#940f0f'
    },
    text: {
        fontSize: 18,
        // fontFamily: 'textFont',
        letterSpacing: 2,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 1,
        color: colors.offWhite,
        opacity: .75
    }
})
