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
        width: 100,
        height: 38,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 100,
        pointerEvents: 'none'
    },
    pressable: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
    },
    pressed: {
        backgroundColor: '#b02b2b8f'
    },
    text: {
        fontSize: 34,
        fontFamily: 'textFont',
        textAlign: 'center',
        padding: 1,
        color: colors.primaryBlack,
        opacity: .75
    }


})
