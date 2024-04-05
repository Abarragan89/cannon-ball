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
                <Text style={styles.earnMoreStarsText}>Complete level One to unlock</Text>
                <Entypo name="lock" size={35} color="#000000b7" />
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
        backgroundColor: '#b59a57c3',
        borderRadius: 10,
        padding: 10,
        width: 280,
        height: 100,
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
        width: 280,
        height: 100,
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
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    levelTitle: {
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
        flexDirection: 'row',
        justifyContent: 'center',
    },
    star: {
        marginHorizontal: 10
    },
    levelStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -5,
    },
    detailLabel: {
        textDecorationLine: 'underline'
    },
    levelDetailsContainer: {
        marginTop: 10,
        marginHorizontal: 30,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    needMoreStarsText: {
        backgroundColor: colors.silverStar,
        position: 'absolute',
        width: 250,
    },
    pressed: {
        elevation: 0,
        shadowOpacity: 0,
    }
})