import { StyleSheet, View, Image, Text } from "react-native";

let WIDTH = 30;
let HEIGHT = 30;

function TNT({ position, handlePosition, display }) {
    let x = position[0];
    let y = position[1];

    return (
        <>
            <View style={[styles.root, { left: x, top: y }]}>
                <Text style={[styles.tntHandle, { top: handlePosition[0], right: handlePosition[1] }]}>T</Text>
                <View style={[styles.boxStyles, {display: display, width: WIDTH, height: HEIGHT}]}>
                    {/* <Image style={{ width: WIDTH, height: HEIGHT}} source={require('../../assets/images/TNTBox.png')} /> */}
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
        paddingTop: 5,
    },
    boxStyles: {
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 2,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: .5,
        backgroundColor: '#940f0f'
    },
    tntHandle: {
        position: 'absolute',
        fontSize: 25,
        left: 8,
        zIndex: -1
    },
    text: {
        color: 'yellow',
        fontSize: 12.1,
        paddingTop: 4,
        fontWeight: 'bold',
        textAlign: 'center'
    }

})