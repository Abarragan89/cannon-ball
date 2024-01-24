import { Link, router } from 'expo-router';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import colors from '../../constants/colors';

const MainButton = ({ children, route }) => {

    function changeRouteHandler() {
        router.navigate(route)
    }

    return (
        <Pressable onPress={changeRouteHandler} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
            <Text style={styles.text} href={route}>
                {children}
            </Text>
        </Pressable>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderWidth: 1, 
        paddingVertical: 5,
        paddingHorizontal: 25,
        backgroundColor: colors.primaryYellow
    },
    text: {
        fontSize: 16
    },
    pressed: {
        opacity: 0.7
    }
})
