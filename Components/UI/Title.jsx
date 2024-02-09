import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const Title = ({ children, color }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text]}>{children}</Text>
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
        fontFamily: 'titleFont',
        color: colors.primaryBrown
    }
})