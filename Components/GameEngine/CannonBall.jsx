import { StyleSheet, View, Text } from "react-native";

const RADIUS = 10

function CannonBall({ position, velocity, display }) {
    const x = position[0];
    const y = position[1];
    return (
        <View style={[styles.cannonBall, { left: x, top: y, display: display }]}>
        </View>

    )
}

const styles = StyleSheet.create({
    cannonBall: {
        borderRadius: RADIUS * 2,
        width: RADIUS * 2,
        height: RADIUS * 2,
        backgroundColor: "black",
        position: "absolute",
    },
})


export default CannonBall;