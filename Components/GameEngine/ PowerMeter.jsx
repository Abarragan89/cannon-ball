import { StyleSheet, View, Text } from "react-native";

function PowerMeter({ powerLevel, displayLevel }) {
    return (
        <View style={styles.root}>
            <Text>Power: {displayLevel}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
})


export default PowerMeter;