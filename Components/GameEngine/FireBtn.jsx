import { Text, View, Pressable, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const FireBtn = () => {

    return (
        <View style={styles.root}>
            <Pressable 
            style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
            >
                <Text style={styles.text}>Fire</Text>
            </Pressable>
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
    },
    pressable: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#940f0f'
    },
    pressed: {
        backgroundColor: '#b02b2b8f'
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
