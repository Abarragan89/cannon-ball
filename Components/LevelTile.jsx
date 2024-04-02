import { router } from 'expo-router';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import colors from '../constants/colors';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const LevelTile = ({ children, route, isLocked }) => {
    const onPressHandler = () => router.push({ pathname: route });

    if (isLocked) {
        return (
            <View style={styles.containerLockedLevel}>
                <Text style={styles.earnMoreStarsText}>Collect 49 <Fontisto style={styles.star} name="star" size={20} color={colors.winningStar} /> to unlocked</Text>
                <Entypo name="lock" size={35} color="black" />
            </View>
        )
    }

    return (
        <Pressable onPress={onPressHandler} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
            <View style={styles.levelStarContainer}>
                <Text style={[styles.text, styles.levelTitle]}>
                    {children}
                </Text>
                <View style={styles.starContainer}>
                    <Fontisto style={styles.star} name="star" size={20} color={colors.winningStar} />
                    <Fontisto style={styles.star} name="star" size={20} color={colors.sandColorAccent} />
                    <Fontisto style={styles.star} name="star" size={20} color={colors.sandColorAccent} />
                </View>
            </View>
            <View>
                <View style={styles.levelStatsContainer}>
                    <View style={styles.levelDetailsContainer}>
                        <Text style={[styles.text, styles.detailLabel]}>Accuracy</Text>
                        <Text style={styles.text}>91.02 px</Text>
                    </View>
                    <View style={styles.levelDetailsContainer}>
                        <Text style={[styles.text, styles.detailLabel]}>Highscore</Text>
                        <Text style={styles.text}>19,019</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default LevelTile;

const styles = StyleSheet.create({
    containerLockedLevel: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.silverStar,
        borderRadius: 10,
        padding: 10,
        width: 300,
        height: 105,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.primaryBlack,
    },
    earnMoreStarsText: {
        fontFamily: 'textFont',
        color: colors.primaryBlack,
        fontSize: 18,
        textAlign: 'center',

    },
    container: {
        backgroundColor: colors.sandColor,
        borderRadius: 10,
        padding: 10,
        width: 300,
        height: 105,
        justifyContent: 'space-between',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.primaryBlack,
        elevation: 3,
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 4,
    },
    levelStarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    levelTitle: {
        marginBottom: 5,
        color: colors.skyColor,
        fontSize: 24,
        fontFamily: 'textFont'
    },
    text: {
        textAlign: 'center',
        color: colors.primaryBlack,
        fontSize: 18,
        fontFamily: 'textFont',
    },
    starContainer: {
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    star: {
        marginHorizontal: 10
    },
    levelStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailLabel: {
        textDecorationLine: 'underline'
    },
    levelDetailsContainer: {
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    needMoreStarsText: {
        backgroundColor: colors.silverStar,
        position: 'absolute',
        width: 250,
    },
    pressed: {
        elevation: 5,
        shadowOpacity: 0,
    }
})