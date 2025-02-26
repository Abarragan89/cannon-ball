import { Text, View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../constants/colors';

////////// NEEDED TO MAKE DISPLAY BECAUSE ACTUAL CANNONLAUNCHER DOES NOT WORK IN SCROLLVIEW //////
function CannonLaunchDisplay({
    rotate,
    barrelColor,
    tipColor,
    cannonBaseColor,
    cannonBallBolt,
    cannonBallBoltHighlight,
    wheelColor,
    wheelColorHighlight,
    scale,
    name,
    isOwned,
    isEquipped
}) {
    return (
        <View>
            <View style={[
                styles.outerCannonContainer,
                isOwned && { backgroundColor: colors.offWhite },
                // we scale it to 0.7 when in scroll view and 'current display' it at a bigger rate
                scale !== 0.7 ? { width: 85, height: 85 } : { width: 65, height: 65 },
                isEquipped && {
                    borderColor: colors.limeGreen,
                    borderWidth: 3,
                    borderRadius: 8,
                }
            ]}>
                {!isOwned &&
                    <View style={[styles.lockedOverlay]} />
                }

                <View style={{ transform: [{ scale: scale }] }}>
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
            </View>
            {isEquipped && scale === 0.7 ?
                <Text style={[styles.cannonName, styles.armedText]}>Armed</Text>
                :
                <Text style={styles.cannonName}>{name}</Text>
            }
        </View>
    )
}

export default CannonLaunchDisplay;

const styles = StyleSheet.create({
    lockedOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 7,
        zIndex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000072',
    },
    outerCannonContainer: {
        position: 'relative',
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.primaryBlack,
        borderRadius: 8,
        alignItems: 'center',
    },
    cannonContainer: {
        top: 40,
        left: 12,
    },
    cannonBarrel: {
        position: 'relative',
        height: 27,
        width: 70,
        borderRadius: 50,
        backgroundColor: '#1a1919',
        transformOrigin: '30%',
        borderWidth: 0.5,
        borderColor: 'black'
    },
    cannonTip: {
        position: 'relative',
        left: 60,
        top: -1.5,
        height: 30,
        width: 10,
        borderRadius: 50,
        backgroundColor: '#0c0c0c',
        borderWidth: 0.5
    },
    cannonBallBase: {
        position: 'absolute',
        top: 6,
        left: 1,
        borderWidth: 32,
        height: 0,
        width: 0,
        borderBottomColor: colors.primaryBrown,
        borderTopColor: '#7204e100',
        borderRightColor: '#08e51300',
        borderLeftColor: '#d3bf1000',
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
        backgroundColor: '#4a4646',
        borderWidth: 0.5,
    },
    cannonWheelTwo: {
        position: 'absolute',
        top: 58,
        left: 47,
        width: 20,
        height: 20,
        borderRadius: 40,
        borderWidth: 0.5,
        backgroundColor: '#4a4646'
    },
    innerWheelOne: {
        position: 'absolute',
        top: 4,
        left: 4.3,
        height: 10,
        width: 10,
        backgroundColor: colors.primaryBrown,
        borderRadius: 10
    },
    innerWheelTwo: {
        position: 'absolute',
        height: 10,
        width: 10,
        backgroundColor: colors.primaryBrown,
        borderRadius: 10
    },
    standContainer: {
        position: 'absolute',
        top: 0
    },
    cannonName: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'textFont',
        fontSize: 17,
        paddingBottom: 10
    },
    armedText: {
        color: colors.limeGreen,
    }
})
