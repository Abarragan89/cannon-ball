import { router } from 'expo-router';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import colors from '../constants/colors';
import { Fontisto } from '@expo/vector-icons';

const LevelTile = ({ children, route }) => {
    const onPressHandler = () => router.push({ pathname: route });

    return (
        <Pressable onPress={onPressHandler} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
            <Text style={styles.text}>
                {children}
            </Text>
            <View style={styles.starContainer}>
                <Fontisto style={styles.star} name="star" size={20} color={colors.skyColor} />
                <Fontisto style={styles.star} name="star" size={20} color={colors.skyColor} />
                <Fontisto style={styles.star} name="star" size={20} color={colors.skyColor} />
            </View>
            <View style={styles.levelDetailsContainer}>
                <Text>Accuracy: </Text>
                <Text> 91.02 px</Text>
            </View>
            <View style={styles.levelDetailsContainer}>
                <Text>Highscore: </Text>
                <Text> 19,019</Text>
            </View>
        </Pressable>
    )
}

export default LevelTile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.goldStar,
        borderRadius: 10,
        padding: 20,
        width: 200,
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 20
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'textFont',
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    star: {
        marginHorizontal: 10
    },
    levelDetailsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    pressed: {
        opacity: 0.9
    }
})