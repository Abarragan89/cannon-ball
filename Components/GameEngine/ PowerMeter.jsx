import { StyleSheet, View, Text } from "react-native";
import * as Progress from 'react-native-progress';

function PowerMeter({ powerLevel, displayLevel }) {

    return (
        <View style={styles.root}>
            <Text>{displayLevel}</Text>
            {/* progress is number from 0 to 1 */}
            <Progress.Bar
                progress={displayLevel / 100}
                width={140}
                style={styles.slider}
                animated={true}
                borderWidth={2}
                borderColor={displayLevel > 50 ? 'red' : 'green'}
                color={displayLevel > 50 ? 'red' : 'green'}
            />
            <View style={styles.powerTextWrapper}>
                <Text style={styles.powerText}>P</Text>
                <Text style={styles.powerText}>o</Text>
                <Text style={styles.powerText}>w</Text>
                <Text style={styles.powerText}>e</Text>
                <Text style={styles.powerText}>r</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    slider: {
        opacity: .5,
        transform: [{ rotate: '-90deg' }],
        position: 'absolute',
        left: -60,
        top: 100,
    },

    powerTextWrapper: {
        position: 'absolute',
        left: 5,
        top: 60,
        alignItems: 'center'
    },
    powerText: {
        fontSize: 14,
        opacity: .5,
    }
})


export default PowerMeter;