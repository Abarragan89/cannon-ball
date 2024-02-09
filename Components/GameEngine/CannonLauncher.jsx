import { View, Image, StyleSheet } from 'react-native'

function CannonLauncher({ position, rotate }) {

    return (
        <View style={[styles.rootContainer, {left: position[0], top: position[1]}]}>
            <View style={[styles.cannonContainer]}>
                <View style={[styles.cannonBarrel, { transform: [{rotate: rotate }]}]}></View>
                {/* <Image style={styles.cannonImage} source={require('../../assets/images/basicCannon.png')} /> */}
            </View>

            <View style={styles.standContainer}>
                <View style={styles.cannonBallBase}></View>
                <View style={styles.cannonBallBaseScrew}></View>
                {/* <Image style={styles.standImage} source={require('../../assets/images/basicCannonStand.png')} /> */}
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
        backgroundColor: 'black'
    },
    cannonTip: {

    },
    cannonBallBase: {
        position: 'relative',
        top: 25,
        left: 16,
        height: 38,
        width: 38,
        backgroundColor: colors.primaryBrown,
        borderRadius: 40
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
    cannonImage: {
        width: 105,
        height: 105
    }, 
    standContainer: {
        position: 'absolute',
        top: 0
    },
    standImage: {
        width: 65,
        height: 65
    }
})
