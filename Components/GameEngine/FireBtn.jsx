import { View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
// Cross Hair Icon 
import { Feather } from '@expo/vector-icons';
// Undo Icon
import { FontAwesome } from '@expo/vector-icons';

const FireBtn = ({ isShooting }) => {
    return (
        <View style={styles.root}>
            <View>
                {
                    isShooting ?
                        <FontAwesome name="undo" size={50} color='#b7b1b1c7' />
                        :
                        <Feather name="crosshair" size={50} color={colors.limeGreen} />
                }
            </View>
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
        bottom: 15,
        right: 50,
        pointerEvents: 'none',
        flex: 1,
        borderRadius: 30,
    }
})
