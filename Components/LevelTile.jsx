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
                <Fontisto style={styles.star} name="star" size={20} color={colors.bronzeStar} />
                <Fontisto style={styles.star} name="star" size={20} color={colors.silverStar} />
                <Fontisto style={styles.star} name="star" size={20} color={colors.goldStar} />
            </View>
        </Pressable>
    )
}

export default LevelTile;

const styles = StyleSheet.create({
    container: {
        margin: 20,
        borderWidth: 1,
        backgroundColor: colors.primaryBrown,
        borderRadius: 100,
        padding: 30,

    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'textFont',
        color: 'white',
        marginBottom: 10
    },
    starContainer: {
        flexDirection: 'row',
    },
    star: {
        marginHorizontal: 5
    },
    pressed: {
        opacity: 0.7
    }
})