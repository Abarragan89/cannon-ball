import { View, Text, StyleSheet } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import colors from '../../constants/colors';

const WinningScoresDisplay = ({winningLimits}) => {
    return (
        <View style={styles.root}>
            <View style={[styles.singleWinScoreContainer, styles.bootLimitTitle]}>
                <Text style={[styles.text, styles.starPoints]}>Star</Text>
                <Text style={[styles.text, styles.starPoints]}>Ratings</Text>
            </View>
            <View style={styles.singleWinScoreContainer}>
                <View style={styles.starContainer}>
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                </View>
                <Text style={styles.text}>{winningLimits[0]}</Text>
            </View>
            <View style={styles.singleWinScoreContainer}>
                <View style={styles.starContainer}>
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                </View>
                <Text style={styles.text}>{winningLimits[1]}</Text>
            </View>
            <View style={styles.singleWinScoreContainer}>
                <View style={styles.starContainer}>
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                </View>
                <Text style={styles.text}>{winningLimits[2]}</Text>
            </View>
        </View>
    )
}

export default WinningScoresDisplay;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#053770ff',
        // width: 240,
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        opacity: 0.8,
        borderRadius: 4,
        borderColor: '#ffffffb7',
        borderWidth: 1,
    },
    starContainer: {
        flexDirection: 'row',
    },
    singleWinScoreContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    bootLimitTitle: {
        marginRight: 10,
        borderRightWidth: 1,
        borderColor: '#ffffffb7',
        paddingRight: 10,
    },
    star: {
        marginHorizontal: 1
    },
    text: {
        color: colors.offWhite,
        fontFamily: 'textFont',
        textAlign: 'center',
        fontSize: 18
    },
    starPoints: {
        color: colors.primaryOrange
    }
})
