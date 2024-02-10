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
                ></View>
                <View
                    // colors={['#7d7373', '#383232']}
                    // locations={[0.01, 0.75]}
                    // start={{ x: 0.1, y: 0.3 }}
                    style={styles.cannonWheelOne}
                />
                <View
                    // colors={['#7d7373', '#383232']}
                    // locations={[0.01, 0.75]}
                    // start={{ x: 0.1, y: 0.3 }}
                    style={styles.cannonWheelTwo}
                />
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
        top: 15,
        left: 0,
    },
    cannonBarrel: {
        position: 'relative',
        height: 27,
        width: 70,
        borderRadius: 50,
        backgroundColor: '#1a1919'
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
        position: 'relative',
        top: 25,
        left: 16,
        height: 38,
        width: 38,
        backgroundColor: colors.primaryBrown,
        borderRadius: 10
    },
    cannonBallBaseScrew: {
        position: 'relative',
        top: -8,
        left: 27,
        height: 15,
        width: 15,
        backgroundColor: colors.primaryBlack,
        borderRadius: 40
    },
    cannonWheelOne: {
        position: 'relative',
        top: -5,
        left: 7,
        width: 22,
        height: 22,
        borderRadius: 40,
        backgroundColor: '#4a4646'
    },
    cannonWheelTwo: {
        position: 'relative',
        top: -27,
        left: 38,
        width: 22,
        height: 22,
        borderRadius: 40,
        backgroundColor: '#4a4646'
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
