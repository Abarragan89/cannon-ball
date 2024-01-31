import { StyleSheet, View } from "react-native";

const RADIUS = 10

function CannonBall({ position, display, color }) {
    const x = position[0];
    const y = position[1];
    return (
        <View style={[styles.cannonBall, {
            left: x,
            top: y,
            display: display,
            backgroundColor: color
        }]}>
        </View>

    )
}

const styles = StyleSheet.create({
    cannonBall: {
        zIndex: -3,
        borderRadius: RADIUS * 2,
        width: RADIUS * 2,
        height: RADIUS * 2,
        position: "absolute",
        borderWidth: 1,
        borderColor: 'black'
    },
})


export default CannonBall;