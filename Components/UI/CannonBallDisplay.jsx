import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../constants/colors';

const CannonBallDisplay = ({ color, gradientColor, size, isOwned }) => {
    return (
        <>
            <View style={[styles.cannonBallContainer, isOwned &&
                {backgroundColor: colors.offWhite}
            ]}>
                {!isOwned &&
                    <View style={styles.lockedOverlay}>
                        <Text style={styles.lockedText}>Locked</Text>
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
    lockedOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 7,
        backgroundColor: '#00000072',
        zIndex: 3,
        justifyContent: 'center'
    },
    lockedText: {
        color: colors.offWhite,
        fontFamily: 'textFont',
        fontSize: 19,
        textAlign: 'center',
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
