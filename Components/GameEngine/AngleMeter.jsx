import { StyleSheet, View, Text } from "react-native";
import * as Progress from 'react-native-progress';


function AngleMeter({ angleLevel }) {
    return (
        <View style={styles.root}>
            <Text style={styles.numberDisplay}>{angleLevel}</Text>
            {/* progress is number from 0 to 1 */}
            <Progress.Circle
                progress={angleLevel / 360}
                size={90}
                direction="counter-clockwise"
                style={styles.circleSlider}
                thickness={7}
                strokeCap='square'
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
        opacity: .5,
        position: 'absolute',
        right: 55,
        bottom: -40,
    },
    numberDisplay: {
        textAlign: 'center'
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
        fontSize: 16,
        
        top: -128,
        right: 36
    }
})

