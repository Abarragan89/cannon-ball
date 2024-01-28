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
    },
    cannonContainer: {
        position: 'absolute',
        top: -20,
        left: -11,
    },
    cannonImage: {
        width: 90,
        height: 90
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