import { StyleSheet, View, Text } from "react-native";
import * as Progress from 'react-native-progress';
import { Dimensions, Platform } from "react-native";

const screenHeight = Dimensions.get('window').height

function PowerMeter({ powerLevel, displayLevel }) {

    return (
        <View style={styles.root}>

            <Text style={styles.numberDisplay}>{displayLevel}</Text>

            {/* progress is number from 0 to 1 */}
            <Progress.Bar
                progress={displayLevel / 100}
                width={300}
                height={7}
                style={[styles.slider]}
                // animated={true}
                borderWidth={1}
                borderColor={displayLevel > 80 ? 'red' :  displayLevel > 43 ? 'orange': 'green'}
                color={displayLevel > 80 ? 'red' :  displayLevel > 43 ? 'orange': 'green'}
            />
            <View style={styles.powerTextWrapper}>
                <Text style={styles.powerText}>_</Text>
                <Text style={styles.powerText}>_</Text>
                <Text style={styles.powerText}>_</Text>
                <Text style={styles.powerText}>_</Text>
                <Text style={styles.powerText}>_</Text>
                <Text style={styles.powerText}>_</Text>
                <Text style={styles.powerText}>_</Text>
                <Text style={styles.powerText}>_</Text>
                <Text style={styles.powerText}>_</Text>
                <Text style={styles.powerText}>_</Text>
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
        marginLeft: 5,
        opacity: .5
    },
    slider: {
        opacity: .5,
        transform: [{ rotate: '-90deg' }],
        position: 'absolute',
        left: -136,
        top: 180,
    },

    powerTextWrapper: {
        position: 'absolute',
        left: 10,
        top: 50,
        opacity: .5,
        alignItems: 'center'
    },
    powerText: {
        // different size fonts creates incorrect layouts on devices
        fontSize: Platform.OS === 'ios' ? 12 : 18,
        paddingVertical: Platform.OS === 'ios' ? 5 : 1,
        opacity: .5
    }
})


export default PowerMeter;