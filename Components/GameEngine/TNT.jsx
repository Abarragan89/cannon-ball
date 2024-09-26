import { StyleSheet, View, Text } from "react-native";

function TNT({ position, handlePosition, display }) {
    
    let WIDTH = 30;
    let HEIGHT = 30;

    let x = position[0];
    let y = position[1];

    return (
        <>
            <View style={[styles.root, { left: x, top: y }]}>
                <Text style={[styles.tntHandle, { top: handlePosition[0], right: handlePosition[1] }]}>T</Text>
                <View style={[styles.boxStyles, {display: display, width: WIDTH, height: HEIGHT}]}>
                    <Text style={styles.text}>TNT</Text>
                </View>
            </View>
        </>
    )
}

export default TNT;

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
    },
    boxStyles: {
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 2,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 2,
        shadowOpacity: .5,
        backgroundColor: '#c40e0e',
        zIndex: 2
    },
    tntHandle: {
        position: 'absolute',
        fontSize: 20,
        fontWeight: 'bold',
        left: 8.5,
        // fontSize: 27,
        // fontWeight: 'bold',
        // left: 6.5,
    },
    text: {
        color: 'yellow',
        fontSize: 12.1,
        paddingTop: 4,
        fontWeight: 'bold',
        textAlign: 'center'
    }

})