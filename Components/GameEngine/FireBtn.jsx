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
                        <FontAwesome name="undo" size={50} color={colors.offWhite} />
                        :
                        <Feather name="crosshair" size={50} color={colors.bronzeStar} />
                }
            </View>
        </View>
    )
}

export default FireBtn;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: 50,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 60,
        right: 50,
        pointerEvents: 'none',
        flex: 1,
        borderRadius: 30,
    }
})
