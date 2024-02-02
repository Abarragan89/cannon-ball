import { View, Image, StyleSheet } from 'react-native'

function CannonLauncher({ position, rotate }) {

    return (
        <View style={[styles.rootContainer, {left: position[0], top: position[1]}]}>
            <View style={[styles.cannonContainer, { transform: [{rotate: rotate }]}]}>
                <Image style={styles.cannonImage} source={require('../../assets/images/basicCannon.png')} />
            </View>
            <View style={styles.standContainer}>
                <Image style={styles.standImage} source={require('../../assets/images/basicCannonStand.png')} />
            </View>
        </View>

    )
}

export default CannonLauncher;

const styles = StyleSheet.create({
    rootContainer: {
        position: 'absolute',
        zIndex: -1,
    },
    cannonContainer: {
        position: 'absolute',
        top: -28,
        left: -18,
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
