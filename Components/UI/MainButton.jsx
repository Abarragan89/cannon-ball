import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';

const MainButton = ({ children, route }) => {
    return (
        <View style={styles.container}>
            <Link style={styles.linkEl} href={route}>
                {children}
            </Link>
        </View>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderWidth: 1, 
        paddingVertical: 5,
        paddingHorizontal: 25
    },
    linkEl: {
        fontSize: 16
    }
})
