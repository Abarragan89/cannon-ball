import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// they can manipulate themselves by grabbing themselves as entities
const MoveCannonLaunch = ({ position, setPosition, updatePositionRef, upperLimit, lowerLimit }) => {
    const intervalRef = useRef(null);

    const handleMoveLeft = () => {
        // check if cannon is below lower limit
        if (lowerLimit && updatePositionRef.current[0] <= lowerLimit) return
        intervalRef.current = setInterval(() => {
            // check if cannon is below lower limit
            if (lowerLimit && updatePositionRef.current[0] <= lowerLimit) clearInterval(intervalRef.current);
            // update both state variable and useRef variable
            setPosition((prev) => [prev[0] - 2, prev[1]]);
            updatePositionRef.current = [updatePositionRef.current[0] - 2, updatePositionRef.current[1]]
        }, 50);
    };

    const handleMoveRight = () => {
        // check if cannon is above upper limit
        if (upperLimit && updatePositionRef.current[0] >= upperLimit) return
        intervalRef.current = setInterval(() => {
            // check if cannon is above upper limit
            if (upperLimit && updatePositionRef.current[0] >= upperLimit) clearInterval(intervalRef.current)
            // update both state variable and useRef variable
            setPosition((prev) => [prev[0] + 2, prev[1]]);
            updatePositionRef.current = [updatePositionRef.current[0] + 2, updatePositionRef.current[1]]
        }, 50);
    };

    const handleRelease = () => {
        clearInterval(intervalRef.current);
    };


    return (
        <View style={styles.root}>
            <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]} onPressIn={handleMoveLeft} onPressOut={handleRelease}>
                <AntDesign name="caretleft" size={25} color="#000000bd" />
                {/* this text is just need to trigger a rerender in the UI */}
                <Text style={{ position: 'absolute', opacity: 0 }}>{position}</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]} onPressIn={handleMoveRight} onPressOut={handleRelease}>
                <AntDesign name="caretright" size={25} color="#000000b8" />
            </Pressable>
        </View>
    )
}

export default MoveCannonLaunch;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10,
        right: 50,
    },
    pressable: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 5
    },
    pressed: {
        backgroundColor: '#00000056'
    },
})
