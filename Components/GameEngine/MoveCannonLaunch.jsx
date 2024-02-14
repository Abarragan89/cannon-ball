import { View, StyleSheet, Pressable } from 'react-native';
import { useRef } from 'react';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons'

// they can manipulate themselves by grabbing themselves as entities
const MoveCannonLaunch = ({ position, setPosition, updatePositionRef }) => {

    function sliderChangeHandler(event) {
        updatePositionRef.current = [event, updatePositionRef.current[0]]
        setPosition(prev => [event, prev[1]])
    }

    const intervalRef = useRef(null);

    const handleMoveLeft = () => {
        intervalRef.current = setInterval(() => {
            setPosition((prev) => [prev[0] - 1, prev[1]]);
        }, 50);
    };

    const handleMoveRight = () => {
        intervalRef.current = setInterval(() => {
            setPosition((prev) => [prev[0] + 1, prev[1]]);
        }, 50);
    };

    const handleRelease = () => {
        clearInterval(intervalRef.current);
    };
    return (
        <View style={styles.root}>
            {/* <View style={styles.arro}> */}
            <Pressable onPressIn={handleMoveLeft} onPressOut={handleRelease}>
                <Ionicons name="arrow-back" />
            </Pressable>
            <Pressable onPressIn={handleMoveLeft} onPressOut={handleRelease}>
                <Ionicons name="arrow-forward" />
            </Pressable>
            {/* </View> */}
            {/* <Slider
                style={{ width: 690, height: 30 }}
                onValueChange={sliderChangeHandler}
                maximumValue={640}
                value={position[0]}
                minimumTrackTintColor="black"
                maximumTrackTintColor="black"
                thumbTintColor='black'
            /> */}
        </View>
    )
}

export default MoveCannonLaunch;

const styles = StyleSheet.create({
    // root: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     position: 'relative',
    //     top: 240,
    //     zIndex: 10,
    //     left: -9
    // },
    root: {
        flex: 1,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10
    }
})
