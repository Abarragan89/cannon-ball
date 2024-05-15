import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fontisto } from '@expo/vector-icons';
import colors from '../../constants/colors';

const CannonBallDisplay = ({ color, gradientColor, size, isOwned, isEquipped }) => {
    return (
        <>
            <View style={[
                styles.cannonBallContainer,
                isOwned && { backgroundColor: colors.offWhite },
                isEquipped && {
                    borderColor: colors.limeGreen,
                    borderWidth: 4,
                    borderRadius: 8,
                }
            ]}>
                {!isOwned &&
                    <View style={[styles.overlay, styles.lockedOverlay]}>
                        <Fontisto name="locked" size={28} color={colors.primaryBlack} />
                    </View>
                }
                <LinearGradient
                    colors={[gradientColor, color]}
                    locations={[0.01, 0.75]}
                    start={{ x: 0.1, y: 0.3 }}
                    style={{
                        borderColor: color,
                        width: size,
                        height: size,
                        borderRadius: size,
                    }}
                />
            </View>
        </>
    )
}

export default CannonBallDisplay;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 7,
        zIndex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lockedOverlay: {
        backgroundColor: '#00000057',
    },
    cannonBallContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primaryBlack,
        borderRadius: 8,
        padding: 8,
        marginHorizontal: 10
    },
})
