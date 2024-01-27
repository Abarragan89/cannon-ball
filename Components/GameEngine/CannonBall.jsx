import { StyleSheet, View, Text } from "react-native";

const RADIUS = 12

function CannonBall({ position, velocity }) {
    const x = position[0] - RADIUS / 2;
    const y = position[1] - RADIUS / 2;
    return (
        <View style={[styles.fireCannonBtn, { left: x, top: y }]}>
        </View>

    )
}

const styles = StyleSheet.create({
    fireCannonBtn: {
        borderRadius: RADIUS * 2,
        width: RADIUS * 2,
        height: RADIUS * 2,
        backgroundColor: "#7f1a2b",
        position: "absolute",
    },
})


export default CannonBall;