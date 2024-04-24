import { View, Text, StyleSheet } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import colors from '../../constants/colors';

const WinningScoresDisplay = () => {
    return (
        <View style={styles.root}>
            <View style={styles.singleWinScoreContainer}>
                <View style={styles.starContainer}>
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                </View>
                <Text style={styles.text}>{500}</Text>
            </View>
            <View style={styles.singleWinScoreContainer}>
                <View style={styles.starContainer}>
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                </View>
                <Text style={styles.text}>{1000}</Text>
            </View>
            <View style={styles.singleWinScoreContainer}>
                <View style={styles.starContainer}>
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                    <Fontisto style={styles.star} name="star" size={10} color={colors.winningStar} />
                </View>
                <Text style={styles.text}>{2000}</Text>
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
        backgroundColor: '#ffffff00',
        width: 240,
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        opacity: 0.8
    },
    starContainer: {
        flexDirection: 'row',
    },
    singleWinScoreContainer: {
        justifyContent:'center',
        alignItems: 'center'
    },
    star: {
        marginHorizontal: 1
    },
    text: {
        color: colors.offWhite,
        fontFamily: 'textFont',
        textAlign: 'center',
        fontSize: 18
    }
})
