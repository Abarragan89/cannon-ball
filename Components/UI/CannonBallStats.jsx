import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import ProgressSquares from '../../Components/UI/ProgressSquares';

const CannonBallStats = ({ size, weight, bounce }) => {

    const [adjustedSize, setAdjustedSize] = useState(null);
    const [adjustedWeight, setAdjustedWeight] = useState(null);
    const [adjustedBounce, setAdjustedBounce] = useState(null);

    useEffect(() => {
        switch (size) {
            case 4:
                setAdjustedSize(1);
                break;
            case 6:
                setAdjustedSize(2);
                break;
            case 8:
                setAdjustedSize(3);
                break;
            case 11:
                setAdjustedSize(4);
                break;
            case 13:
                setAdjustedSize(5);
                break;
        }
        switch (weight) {
            case 0.05:
                setAdjustedWeight(1);
                break;
            case 0.08:
                setAdjustedWeight(2);
                break;
            case 0.11:
                setAdjustedWeight(3);
                break;
            case 0.14:
                setAdjustedWeight(4);
                break;
            case 0.17:
                setAdjustedWeight(5);
                break;
        }
        switch (bounce) {
            case 0.55:
                setAdjustedBounce(1);
                break;
            case 0.65:
                setAdjustedBounce(2);
                break;
            case 0.75:
                setAdjustedBounce(3);
                break;
            case 0.85:
                setAdjustedBounce(4);
                break;
            case 0.95:
                setAdjustedBounce(5);
                break;
        }
    }, [size, weight, bounce]);

    return (
        <View>
            <Text style={styles.statText}>Size</Text>
            <ProgressSquares squareCount={adjustedSize} maxAmount={5}/>
            <Text style={styles.statText}>Weight</Text>
            <ProgressSquares squareCount={adjustedWeight} maxAmount={5} />
            <Text style={styles.statText}>Bounce</Text>
            <ProgressSquares squareCount={adjustedBounce} maxAmount={5} />
        </View>
    )
}

export default CannonBallStats;

const styles = StyleSheet.create({
    statText: {
        margin: 0,
        fontFamily: 'textFont',
        color: colors.offWhite,
        fontSize: 14
    },
})
