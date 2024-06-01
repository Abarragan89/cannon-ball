import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';

function SpecialCannonBall({
    position,
    display,
    gradientColor,
    cannonBallRadius
}) {
    const x = position[0];
    const y = position[1];
    console.log('x ', typeof x, x);
    
    return (
        <>
            {/* Eight Ball */}
            {gradientColor === 'eightBall' &&
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
            }
            {/* Skull */}
            {gradientColor === 'skull' &&
                <View
                    style={{
                        left: x,
                        top: y,
                        display: display,
                        zIndex: 0,
                        position: 'absolute',
                        borderRadius: cannonBallRadius * 2,
                        width: cannonBallRadius * 2,
                        height: cannonBallRadius * 2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View style={styles.skullContainer}>
                        <Ionicons
                            name="skull"
                            size={16}
                            color="black"
                        />
                    </View>
                </View>
            }
            {gradientColor === 'ghost' &&
                <View
                    style={{
                        left: x,
                        top: y,
                        display: display,
                        zIndex: 0,
                        position: 'absolute',
                        borderRadius: cannonBallRadius * 2,
                        width: cannonBallRadius * 2,
                        height: cannonBallRadius * 2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View style={styles.skullContainer}>
                        <MaterialCommunityIcons
                            name="ghost"
                            size={26}
                            color="#f9f9f977"
                        />
                    </View>
                </View>
            }
        </>
    )
}

export default SpecialCannonBall;

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
    },
    skullContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})