import { View, Text, StyleSheet } from 'react-native';
import Title from '../UI/Title';
import ModalDetaiItemContainer from '../UI/ModalDetaiItemContainer';
import SecondaryButton from '../UI/SecondaryButton';
import { Fontisto } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { router } from 'expo-router';

const EndGameModal = ({ endGameData }) => {
    const finalScore = endGameData.current.airTime * endGameData.current.bounces * endGameData.current.multiplier

    return (
        <View style={[styles.root,]}>
            <View style={styles.modalMainView}>
                <Title color={colors.skyColor} size={35}>{endGameData.current.accuracyName}</Title>
                <Text style={styles.pixelText}>({endGameData.current.accuracyFloat} pixels away!)</Text>
                <View style={styles.detailsContainer}>
                    <ModalDetaiItemContainer
                        itemName='Air Time'
                        itemAmount={endGameData.current.airTime}
                        hasBorder={0}
                    />
                    <ModalDetaiItemContainer
                        itemName='Bounce Bonus'
                        itemAmount={endGameData.current.bounces}
                    />
                    <Text style={styles.totalText}>{endGameData.current.airTime * endGameData.current.bounces}</Text>
                    <ModalDetaiItemContainer
                        itemName='Accuracy Bonus'
                        itemAmount={endGameData.current.multiplier}
                    />
                    <View style={styles.finalTotalContainer}>
                        <Text style={styles.totalText}>Total Points</Text>
                        <Text style={styles.totalText}>{finalScore}</Text>
                    </View>
                </View>
                <View style={styles.starContainer}>
                    {finalScore > endGameData.current.winningScore[0]
                        &&
                        <Fontisto name="star" size={30} color={colors.bronzeStar} />
                    }
                    {finalScore > endGameData.current.winningScore[1]
                        &&
                        <Fontisto name="star" size={30} color={colors.silverStar} />

                    }
                    {finalScore > endGameData.current.winningScore[2]
                        &&
                        <Fontisto name="star" size={30} color={colors.goldStar} />
                    }
                </View>
                <View style={styles.buttonContainer}>
                    {/* <MainButton route="/CampaignOverviewScreen">Map</MainButton>
                    <MainButton route="/GameScreen/ChapterOne/Level2">Next Level</MainButton> */}
                    <SecondaryButton
                        runFunc={() => router.back()}
                    >Back</SecondaryButton>
                    <SecondaryButton
                        route={`/GameScreen/${endGameData.current.nextLevel}`}
                    >Next Level</SecondaryButton>
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
    pixelText: {
        color: colors.skyColor,
        textAlign: 'center',
        fontSize: 18,
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
})
