import { StyleSheet, View, Text } from "react-native";
import * as Progress from 'react-native-progress';

function PowerMeter({ powerLevel, displayLevel }) {

    return (
        <View style={styles.root}>
            <Text style={styles.numberDisplay}>{displayLevel}</Text>
            {/* progress is number from 0 to 1 */}
            <Progress.Bar
                progress={displayLevel / 100}
                width={140}
                height={10}
                style={styles.slider}
                animated={true}
                borderWidth={1}
                borderColor={displayLevel > 80 ? 'red' :  displayLevel > 50 ? 'orange': 'green'}
                color={displayLevel > 80 ? 'red' :  displayLevel > 50 ? 'orange': 'green'}
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
    numberDisplay: {
        marginTop: 10,
        marginLeft: 4,
        opacity: .5
    },
    slider: {
        opacity: .5,
        transform: [{ rotate: '-90deg' }],
        position: 'absolute',
        left: -55,
        top: 100,
    },

    powerTextWrapper: {
        position: 'absolute',
        left: 10,
        top: 60,
        opacity: .5,
        alignItems: 'center'
    },
    powerText: {
        fontSize: 12,
    }
})


export default PowerMeter;