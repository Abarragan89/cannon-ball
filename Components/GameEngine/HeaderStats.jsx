import { View, Text, StyleSheet } from "react-native"


const HeaderStats = (entity) => {
    return (
        <View style={styles.root}>
                    <Text style={styles.text}>Air Time:</Text>
            <View style={styles.flexRowRoot}>
                {/* <View style={styles.airTimeView}> */}
                    <Text style={styles.text}> {entity.airTime}</Text>
                {/* </View> */}
                <Text style={styles.text}>Bounces: {entity.bounces}</Text>
            </View>
        </View>
    )
}

export default HeaderStats;

const styles = StyleSheet.create({
    root: {
        marginTop: 15,
        paddingRight: 10,
        flex: 1,
        position: 'absolute',
        width: '100%',
        alignItems: 'flex-end',
        zIndex: 33
    },
    flexRowRoot: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    text: {
        paddingHorizontal: 20,
        letterSpacing: 2,
        fontSize: 20,
        fontFamily: 'textFont'
    },
    airTimeView: {
        flexDirection: 'row'
    }
})
