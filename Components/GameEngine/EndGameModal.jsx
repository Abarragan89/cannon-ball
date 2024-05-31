import { View, Text, StyleSheet } from 'react-native';
import Title from '../UI/Title';
import ModalDetaiItemContainer from '../UI/ModalDetaiItemContainer';
import SecondaryButton from '../UI/SecondaryButton';
import { Fontisto } from '@expo/vector-icons';
import colors from '../../constants/colors';

const EndGameModal = ({
    endGameData,
    nextLevelData,
    cannonBallColor,
    cannonBallGradientClr,
    cannonBallBounce,
    cannonBallWeight,
    cannonBallSize,
    isSoundOn,
    isSoundEffectsOn,
    isHapticsOn,
    cannonColor
}) => {
    const finalScore = (endGameData.current.airTime + endGameData.current.bounces) * endGameData.current.multiplier

    return (
        <View style={[styles.root,]}>
            <View style={styles.modalMainView}>
                <Title color={colors.skyColor} size={35}>{endGameData.current.accuracyName}</Title>
                <View style={styles.pixelTextContainer}>
                    <Text style={styles.pixelText}>({endGameData.current.accuracyFloat} pixels away!)</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <ModalDetaiItemContainer
                        itemName='Air Time'
                        itemAmount={endGameData.current.airTime}
                        hasBorder={0}
                    />
                    <ModalDetaiItemContainer
                        itemName='Bounce Bonus'
                        itemAmount={endGameData.current.bounces}
                        operation={'+'}
                    />
                    <Text style={styles.totalText}>{endGameData.current.airTime + endGameData.current.bounces}</Text>
                    <ModalDetaiItemContainer
                        itemName='Accuracy Bonus'
                        itemAmount={endGameData.current.multiplier}
                        operation={'x'}
                    />
                    <View style={styles.finalTotalContainer}>
                        <Text style={styles.totalText}>Total Points</Text>
                        <Text style={[styles.totalText, styles.finalScoreText]}>{finalScore}</Text>
                    </View>
                </View>
                <View style={styles.starContainer}>
                    {
                        finalScore < endGameData.current.winningScore[0] ?
                            <Text style={styles.tryHigherScoreText}>*Earn a higher score to earn stars</Text>
                            :
                            <>
                                <Fontisto name="star" size={30} color={finalScore > endGameData.current.winningScore[0] ? colors.winningStar : colors.sandColorAccent} />
                                <Fontisto name="star" size={30} color={finalScore > endGameData.current.winningScore[1] ? colors.winningStar : colors.sandColorAccent} />
                                <Fontisto name="star" size={30} color={finalScore > endGameData.current.winningScore[2] ? colors.winningStar : colors.sandColorAccent} />
                            </>
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <SecondaryButton
                        route={'/LevelLobbyScreen'}
                        params={{ mapName: endGameData.current.currentLevel }}
                    >Back</SecondaryButton>

                    {nextLevelData !== null &&
                        <SecondaryButton
                            route={`/GameScreen/${endGameData.current.nextLevel}`}
                            params={{
                                levelId: nextLevelData.id,
                                lastAccuracy: nextLevelData.accuracy,
                                lastHighscore: nextLevelData.highscore,
                                lastEarnedStars: nextLevelData.earnedStars,
                                cannonBallColor,
                                cannonBallGradientClr,
                                cannonBallBounce,
                                cannonBallWeight,
                                cannonBallSize,
                                isSoundOn,
                                isSoundEffectsOn,
                                isHapticsOn,
                                cannonColor
                            }}
                        >Next Level</SecondaryButton>
                    }
                </View>
            </View>
        </View>
    )
}

export default EndGameModal;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#00000083',
        zIndex: 99,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalMainView: {
        width: 400,
        borderRadius: 8,
        backgroundColor: colors.sandColor,
        borderColor: 'black',
        borderWidth: 1,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 4,
        alignItems: 'center'
    },
    pixelTextContainer: {
        borderRadius: 4,
        backgroundColor: '#ffff003d',
        padding: 3,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#0000005c'
    },
    pixelText: {
        color: colors.skyColor,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'textFont',
    },
    detailsContainer: {
        alignItems: 'center',
        marginTop: 10,
        alignItems: 'flex-end'
    },
    buttonContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        zIndex: 999
    },
    finalTotalContainer: {
        marginVertical: 9,
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    totalText: {
        fontSize: 23,
        marginTop: -10,
        color: colors.skyColor,
        fontFamily: 'textFont'
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 260,
    },
    tryHigherScoreText: {
        fontFamily: 'textFont',
        color: colors.offWhite,
        fontSize: 18,
        textAlign: 'center',
        width: 300,
    },
})
