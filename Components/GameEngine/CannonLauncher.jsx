import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native'

function CannonLauncher({
    position,
    rotate,
    barrelColor,
    tipColor,
    cannonBaseColor,
    cannonBallBolt,
    cannonBallBoltHighlight,
    wheelColor,
    wheelColorHighlight,
}) {
    return (
        <View style={[styles.rootContainer, { left: position[0], top: position[1] }]}>
            <View style={[styles.cannonContainer]}>
                <View style={[styles.cannonBarrel, { transform: [{ rotate: rotate }], backgroundColor: barrelColor }]}>
                    <View style={[styles.cannonTip, { backgroundColor: tipColor }]}></View>
                </View>
            </View>

            <View style={styles.standContainer}>
                {/* This is a view because linearGradient doesn't work on just border */}
                <View
                    style={[styles.cannonBallBase, {
                        borderBottomColor: cannonBaseColor
                    }]}
                />
                <LinearGradient
                    colors={[cannonBallBoltHighlight, cannonBallBolt]}
                    locations={[0.01, 0.75]}
                    start={{ x: 0.1, y: 0.3 }}
                    style={styles.cannonBallBaseScrew}
                />
                <LinearGradient
                    colors={[wheelColorHighlight, wheelColor]}
                    locations={[0.01, 0.75]}
                    start={{ x: 0.1, y: 0.3 }}
                    style={styles.cannonWheelOne}
                >
                    <View style={[styles.innerWheelOne, { backgroundColor: cannonBaseColor }]}></View>
                </LinearGradient>
                <LinearGradient
                    colors={[wheelColorHighlight, wheelColor]}
                    locations={[0.01, 0.75]}
                    start={{ x: 0.1, y: 0.3 }}
                    style={styles.cannonWheelTwo}
                >
                    <View style={[styles.innerWheelOne, { backgroundColor: cannonBaseColor }]}></View>
                </LinearGradient>
            </View>
        </View>
    )
}

export default CannonLauncher;

const styles = StyleSheet.create({
    rootContainer: {
        zIndex: 0,
    },
    cannonContainer: {
        position: 'absolute',
        top: 40,
        left: 12,
    },
    cannonBarrel: {
        position: 'relative',
        height: 27,
        width: 70,
        borderRadius: 50,
        backgroundColor: '#2b2828',
        transformOrigin: '30%'
    },
    cannonTip: {
        position: 'relative',
        left: 60,
        top: -1.5,
        height: 30,
        width: 10,
        borderRadius: 50,
        backgroundColor: '#0c0c0c',
    },
    cannonBallBase: {
        position: 'absolute',
        top: 6,
        left: 1,
        height: 0,
        width: 0,
        borderWidth: 32,
        borderBottomColor: colors.primaryBrown,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    cannonBallBaseScrew: {
        position: 'relative',
        top: 49,
        left: 28,
        height: 10,
        width: 10,
        backgroundColor: '#0c0c0c',
        borderRadius: 40
    },
    cannonWheelOne: {
        position: 'absolute',
        top: 58,
        left: -1,
        width: 20,
        height: 20,
        borderRadius: 40,
    },
    cannonWheelTwo: {
        position: 'absolute',
        top: 58,
        left: 47,
        width: 20,
        height: 20,
        borderRadius: 40,
    },
    innerWheelOne: {
        position: 'absolute',
        top: 5,
        left: 5,
        height: 10,
        width: 10,
        borderRadius: 10
    },
    innerWheelTwo: {
        position: 'absolute',
        height: 10,
        width: 10,
        borderRadius: 10
    },
    standContainer: {
        position: 'absolute',
        top: 0
    }
})
