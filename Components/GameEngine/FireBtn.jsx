import { Text, View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const FireBtn = ({ isShooting }) => {

    return (
        <View style={[styles.root, isShooting && {
            borderColor: colors.offWhite,
            paddingTop: 7
        }]}>
            <Text style={[styles.text, isShooting && {
                color: colors.offWhite
            }]}>{
                    isShooting ?
                    <FontAwesome name="undo" size={38} color={colors.offWhite} />
                        :
                        <Fontisto name="fire" size={38} color="#ff0000" />
                }
            </Text>
        </View>
    )
}

export default FireBtn;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: 60,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 60,
        right: 50,
        paddingTop: 5,
        paddingLeft: 1,
        pointerEvents: 'none',
        flex: 1,
        borderWidth: 1,
        borderColor: '#ff0000',
        borderRadius: 30,
        backgroundColor: '#00000056'
    },
    text: {
        fontSize: 18,
        letterSpacing: 2,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 1,
        // color: colors.offWhite,
        color: '#ff0000',
    }
})
