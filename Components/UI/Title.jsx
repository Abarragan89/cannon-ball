import { View, Text, StyleSheet } from "react-native";

const Title = ({ children, color }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, {color: color}]}>{children}</Text>
        </View>
    )
}

export default Title;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1
    },
    text: {
        fontSize: 50,
        letterSpacing: 2,
        fontFamily: 'titleFont'
    }
})