import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet } from 'react-native';

function CannonBall({ position, display, color, gradientColor, cannonBallRadius }) {
    const x = position[0];
    const y = position[1];

    return (
        <>
            {gradientColor === 'eightBall' ?
                <View
                    style={{
                        left: x,
                        top: y,
                        display: display,
                        borderColor: '#3b3b3ba0',
                        borderWidth: 0.5,
                        zIndex: 0,
                        position: 'absolute',
                        borderRadius: cannonBallRadius * 2,
                        width: cannonBallRadius * 2,
                        height: cannonBallRadius * 2,
                        backgroundColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View style={styles.eightBallTextView}>
                        <Text style={styles.eightBallText}>8</Text>
                    </View>
                </View>
                :
                <LinearGradient
                    // Background Linear Gradient
                    // first color is the white shine
                    colors={[gradientColor, color]}
                    locations={[0.01, 0.75]}
                    start={{ x: 0.1, y: 0.3 }}
                    style={{
                        left: x,
                        top: y,
                        display: display,
                        borderColor: '#3b3b3ba0',
                        borderWidth: 0.5,
                        zIndex: 0,
                        position: 'absolute',
                        borderRadius: cannonBallRadius * 2,
                        width: cannonBallRadius * 2,
                        height: cannonBallRadius * 2,
                    }}
                />
            }
        </>
    )
}

export default CannonBall;

const styles = StyleSheet.create({
    eightBallTextView: {
        backgroundColor: colors.offWhite,
        borderRadius: 20,
        width: '43%',
        height: '43%',
        marginBottom: 4,
    },
    eightBallText: {
        textAlign: 'center',
        fontSize: 6,
        fontWeight: 'bold'
    }
})