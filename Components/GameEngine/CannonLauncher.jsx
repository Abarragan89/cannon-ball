import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

function CannonLauncher({ position, rotate }) {

    return (
        <View style={[styles.rootContainer, { left: position[0], top: position[1] }]}>
            <View style={[styles.cannonContainer]}>
                <View style={[styles.cannonBarrel, { transform: [{ rotate: rotate }] }]}>
                    <View style={styles.cannonTip}></View>
                </View>
            </View>

            <View style={styles.standContainer}>

                <View
                    colors={['#b55454', 'brown']}
                    locations={[0.01, 0.75]}
                    start={{ x: 0.1, y: 0.3 }}
                    style={styles.cannonBallBase}
                />
                <View
                
                    // colors={['#383434', '#151010']}
                    // locations={[0.01, 0.75]}
                    // start={{ x: 0.1, y: 0.3 }}
                    style={styles.cannonBallBaseScrew}
                />
                <View
                    // colors={['#7d7373', '#383232']}
                    // locations={[0.01, 0.75]}
                    // start={{ x: 0.1, y: 0.3 }}
                    style={styles.cannonWheelOne}
                >
                    <View style={styles.innerWheelOne}></View>
                </View>
                <View
                    // colors={['#7d7373', '#383232']}
                    // locations={[0.01, 0.75]}
                    // start={{ x: 0.1, y: 0.3 }}
                    style={styles.cannonWheelTwo}
                > 
                <View style={styles.innerWheelOne}></View>
                </View>

            </View>
        </View>
    )
}

export default CannonLauncher;

const styles = StyleSheet.create({
    rootContainer: {
        position: 'absolute',
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
        backgroundColor: '#1a1919',
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
        left: 3,
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
        backgroundColor: '#4a4646'
    },
    cannonWheelTwo: {
        position: 'absolute',
        top: 58,
        left: 47,
        width: 20,
        height: 20,
        borderRadius: 40,
        backgroundColor: '#4a4646'
    },
    innerWheelOne: {
        position: 'absolute',
        top: 5,
        left: 5,
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

    // cannonImage: {
    //     width: 105,
    //     height: 105
    // }, 
    standContainer: {
        position: 'absolute',
        top: 0
    },
    // standImage: {
    //     width: 65,
    //     height: 65
    // }
})
