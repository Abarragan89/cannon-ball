import { StyleSheet, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const RADIUS = 10

function CannonBall({ position, display, color, gradientColor }) {
    const x = position[0];
    const y = position[1];

    return (

            <LinearGradient
                // Background Linear Gradient
                // first color is the white shine
                colors={[gradientColor, color]}
                locations={[0.01, 0.75]}
                start={{ x: 0.1, y: 0.3 }}
                style={[styles.cannonBall, {
                    left: x,
                    top: y,
                    display: display,
                    borderColor: color,
                }]}
            />
            // <View
            //     style={[styles.cannonBall, {
            //         left: x,
            //         top: y,
            //         display: display,
            //         borderColor: color,
            //         backgroundColor: color
            //     }]}
            // />
    )
}

const styles = StyleSheet.create({
    cannonBall: {
        zIndex: 0,
        height: 20,
        position: 'absolute',
        width: 20,
        borderRadius: RADIUS * 2,
        borderWidth: 1,
        width: RADIUS * 2,
        height: RADIUS * 2,
    }
})


export default CannonBall;