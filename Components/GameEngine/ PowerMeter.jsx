import { StyleSheet, View, Text } from "react-native";

function PowerMeter({ powerLevel }) {
    return (
        <View style={styles.root}>
            <Text>{powerLevel}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
})


export default PowerMeter;