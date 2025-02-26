import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import colors from '../constants/colors';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const LevelTile = ({ children, route, params, isLocked, accuracy, highscore, earnedStars, currentLevel }) => {

    const [prevLevel, setPrevLevel] = useState('')
    const [levelNumber, setLevelNumber] = useState(0);

    useEffect(() => {
        // Determine Previous Level
        if (currentLevel) {
            switch (currentLevel) {
                case 'Level Two':
                    setPrevLevel('Level One')
                    setLevelNumber(2)
                    break;
                case 'Level Three':
                    setLevelNumber(3)
                    setPrevLevel('Level Two')
                    break;
                case 'Level Four':
                    setLevelNumber(4)
                    setPrevLevel('Level Three')
                    break;
                case 'Level Five':
                    setLevelNumber(5)
                    setPrevLevel('Level Four')
                    break;
                case 'Level Six':
                    setLevelNumber(6)
                    setPrevLevel('Level Five')
                    break;
                case 'Level Seven':
                    setLevelNumber(7)
                    setPrevLevel('Level Six')
                    break;
                case 'Level Eight':
                    setLevelNumber(8)
                    setPrevLevel('Level Seven')
                    break;
                case 'Level Nine':
                    setLevelNumber(9)
                    setPrevLevel('Level Eight')
                    break;
                case 'Level Ten':
                    setLevelNumber(10)
                    setPrevLevel('Level Nine')
                    break;
            }
        }
    }, [currentLevel])


    const onPressHandler = () => router.push({ pathname: route, params: params });

    if (isLocked === 0) {
        return (
            <View style={styles.containerLockedLevel}>
                <Text style={styles.earnMoreStarsText}>Complete {prevLevel} to unlock</Text>
                <Text style={styles.lockedLevelNumberText}>{levelNumber}</Text>
                <Entypo name="lock" size={40} color="#000000b7" />
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
                    {
                        earnedStars > 0 ?
                            <Fontisto style={styles.star} name="star" size={20} color={colors.winningStar} />
                            :
                            <Fontisto style={styles.star} name="star" size={20} color={colors.sandColorAccent} />
                    }
                    {
                        earnedStars > 1 ?
                            <Fontisto style={styles.star} name="star" size={20} color={colors.winningStar} />
                            :
                            <Fontisto style={styles.star} name="star" size={20} color={colors.sandColorAccent} />
                    }
                    {
                        earnedStars > 2 ?
                            <Fontisto style={styles.star} name="star" size={20} color={colors.winningStar} />
                            :
                            <Fontisto style={styles.star} name="star" size={20} color={colors.sandColorAccent} />
                    }
                </View>
            </View>
            <View>
                <View style={styles.levelStatsContainer}>
                    <View style={styles.levelDetailsContainer}>
                        <Text style={[styles.text, styles.detailLabel]}>Accuracy</Text>
                        {/* 50 accuracy means the level hasn't been won yet */}
                        {accuracy === 50 ?
                            <Text style={styles.text}>N/A</Text>
                            :
                            <Text style={styles.text}>{accuracy} px</Text>
                        }
                    </View>
                    <View style={styles.levelDetailsContainer}>
                        <Text style={[styles.text, styles.detailLabel]}>Highscore</Text>
                        <Text style={styles.text}>{highscore}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default LevelTile;

const styles = StyleSheet.create({
    containerLockedLevel: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b59a57c3',
        borderRadius: 10,
        padding: 10,
        width: 280,
        height: 90,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.primaryBlack,
    },
    lockedLevelNumberText: {
        color: colors.offWhite,
        position: 'absolute',
        zIndex: 50,
        bottom: 18
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
        height: 90,
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
        color: colors.primaryBlack,
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