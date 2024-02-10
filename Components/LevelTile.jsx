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
            <View style={styles.bestAccuracyContainer}>
                <Text>Accuracy:</Text>
                <Text>91.02 pixels</Text>
            </View>
        </Pressable>
    )
}

export default LevelTile;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        backgroundColor: colors.primaryBrown,
        borderRadius: 10,
        padding: 20,
        height: 150,
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 20
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'textFont',
        color: 'white',
    },
    starContainer: {
        flexDirection: 'row',
    },
    star: {
        marginHorizontal: 5
    },
    bestAccuracyContainer: {
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.9
    }
})