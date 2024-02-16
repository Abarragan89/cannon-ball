import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// they can manipulate themselves by grabbing themselves as entities
const MoveCannonLaunch = ({ position, setPosition, updatePositionRef }) => {
    const intervalRef = useRef(null);

    const handleMoveLeft = (direction) => {
        intervalRef.current = setInterval(() => {
            setPosition((prev) => [prev[0] - 4, prev[1]]);
            updatePositionRef.current = [updatePositionRef.current[0] - 4, updatePositionRef.current[1]]
        }, 50);
    };

    const handleMoveRight = () => {
        intervalRef.current = setInterval(() => {
            setPosition((prev) => [prev[0] + 4, prev[1]]);
            updatePositionRef.current = [updatePositionRef.current[0] + 4, updatePositionRef.current[1]]
        }, 50);
    };

    const handleRelease = () => {
        clearInterval(intervalRef.current);
    };

    useEffect(() => {
    }, [position])


    return (
        <View style={styles.root}>
            <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]} onPressIn={handleMoveLeft} onPressOut={handleRelease}>
                <AntDesign name="caretleft" size={25} color="#000000bd" />
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
