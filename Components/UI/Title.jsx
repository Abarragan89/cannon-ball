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
        fontSize: 40,
        letterSpacing: 2,
        fontFamily: 'titleFont',
        color: colors.primaryBlack,
        textShadowColor: 'black',
        textShadowRadius: 5,
        textShadowOffset: { width: 1, height: 1},
    }
})