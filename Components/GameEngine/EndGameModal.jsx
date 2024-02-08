import { View, Text, StyleSheet } from 'react-native';
import Title from '../UI/Title';
import ModalDetaiItemContainer from '../UI/ModalDetaiItemContainer';
import MainButton from '../UI/MainButton';
import { Fontisto } from '@expo/vector-icons';
import colors from '../../constants/colors';

const EndGameModal = (entity) => {
    const finalScore = entity.airTime * entity.bounces * entity.multiplier

    return (
        <View style={[styles.root, { display: entity.display }]}>
            <View style={styles.modalMainView}>
                <Title color='white'>{entity.accuracyName}</Title>
                <Text style={styles.pixelText}>({entity.accuracyFloat} pixels away!)</Text>
                <View style={styles.detailsContainer}>
                    <ModalDetaiItemContainer
                        itemName='Air Time'
                        itemAmount={entity.airTime}
                        hasBorder={0}
                    />
                    <ModalDetaiItemContainer
                        itemName='Bounces'
                        itemAmount={entity.bounces}
                    />
                    <Text style={styles.totalText}>{entity.airTime * entity.bounces}</Text>
                    <ModalDetaiItemContainer
                        itemName='Accuracy'
                        itemAmount={entity.multiplier}
                    />
                    <Text style={styles.totalText}>{finalScore}</Text>
                </View>
                <View style={styles.starContainer}>
                    {finalScore > entity.winningScore[0]
                        &&
                        <Fontisto name="star" size={40} color={colors.bronzeStar} />
                    }
                    {finalScore > entity.winningScore[1]
                        &&
                        <Fontisto name="star" size={40} color={colors.silverStar} />

                    }
                    {finalScore > entity.winningScore[2]
                        &&
                        <Fontisto name="star" size={40} color={colors.goldStar} />
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <MainButton route="/CampaignOverviewScreen">Map</MainButton>
                    <MainButton route="/GameScreen/ChapterOne/Level2">Next Level</MainButton>
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
        padding: 10,
        borderRadius: 8,
        margin: '0 auto',
        backgroundColor: '#1d58d7',
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
        color: 'yellow',
        textAlign: 'center',
        fontSize: 13,
        margin: -5
    },
    detailsContainer: {
        alignItems: 'center',
        paddingTop: 25,
        alignItems: 'flex-end'
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 260,
        justifyContent: 'center',
        zIndex: 999
    },
    totalText: {
        fontSize: 15,
        marginTop: -10,
        color: 'yellow'
    },
    starContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 260,
    },
})
