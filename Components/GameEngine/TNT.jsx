import { StyleSheet, View, Text } from "react-native";

let WIDTH = 30;
let HEIGHT = 30;

function TNT({ position, handlePosition }) {
    let x = position[0];
    let y = position[1];

    return (
        <>
        <View style={[styles.root, { left: x, top: y }]}>
            <Text style={[styles.tntHandle, {top: handlePosition}]}>T</Text>
        <View style={styles.boxStyles}>
            <Text style={styles.text}>TNT</Text>
        </View>
        </View>
        </>
    )
}

export default TNT;

const styles = StyleSheet.create({
    root: {        position: 'absolute',
        paddingTop: 5,
    },
    boxStyles: {
        paddingLeft: 1,
        fontWeight: 'bold',
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'black',
    },
    tntHandle: {
        position: 'absolute',
        fontSize: 25,
        left: 8,
        zIndex: -1
    },
    text: {
        color: 'yellow'
    }

})