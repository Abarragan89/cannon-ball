import { StyleSheet, View, Text } from "react-native";

function AngleMeter({ angleLevel }) {
    return (
        <View style={styles.root}>
            <Text>Angle: {angleLevel}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        right: 40,
        flex: 1
    }
})


export default AngleMeter;