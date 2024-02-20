import { StyleSheet, View, Text } from "react-native";
import * as Progress from 'react-native-progress';
import colors from "../../constants/colors";


function AngleMeter({ angleLevel }) {
    console.log('angle level', angleLevel)

    return (
        <View style={styles.root}>

            {/* <Text style={styles.meter90Deg}>{angleLevel}</Text> */}
            <Text style={styles.meter90Deg}>|</Text>

            {/* progress is number from 0 to 1 */}
            <Progress.Circle
                progress={angleLevel / 360}
                size={90}
                direction="counter-clockwise"
                style={styles.circleSlider}
                thickness={7}
                color={colors.primaryBlack}
                strokeCap='butt'
            />
            <View style={styles.angleTextWrapper}>
                <Text style={styles.angleText}>Angle</Text>
            </View>
        </View>
    )
}
export default AngleMeter;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        opacity: .75,
        position: 'absolute',
        left: 30,
        bottom: 0,
        height: 56,
        overflow: 'hidden',
        zIndex: 10,
    },
    meter90Deg: {
        position: 'relative',
        left: '49%',
        top: 5,
        fontSize: 8,
        color: 'black',

    },
    circleSlider: {
        transform: [{ rotate: '90deg' }],
    },

    angleTextWrapper: {
        left: 10,
        top: 60,
        alignItems: 'center'
    },
    angleText: {
        position: 'absolute',
        fontSize: 14,
        top: -128,
        right: 38
    }
})

