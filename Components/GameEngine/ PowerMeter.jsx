import { StyleSheet, View, Text } from "react-native";
import * as Progress from 'react-native-progress';
import { Platform } from "react-native";

function PowerMeter({ displayPower }) {
    return (
        <View style={styles.root}>
            {/* <Text style={styles.numberDisplay}>{displayPower}</Text> */}
            {/* progress is number from 0 to 1 */}
            <Progress.Bar
                progress={displayPower / 75}
                width={220}
                height={7}
                style={[styles.slider]}
                // animated={true}
                borderWidth={1}
                // borderColor={displayPower > 80 ? 'red' :  displayPower > 43 ? '#ac7207': 'green'}
                borderColor={'black'}

                color={displayPower > 53 ? '#ff1c1c' :  displayPower > 26 ? '#ffcc00': '#00ff08'}
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        // flex: 1,
        // zIndex: -1
    },
    // numberDisplay: {
    //     marginTop: 10,
    //     marginLeft: 5,
    //     opacity: .8
    // },
    slider: {
        opacity: .75,
        transform: [{ rotate: '-90deg' }],
        position: 'absolute',
        left: -96,
        top: 180,
    },

    powerTextWrapper: {
        position: 'absolute',
        left: 10,
        top: 70,
        opacity: .75,
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