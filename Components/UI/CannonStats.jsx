import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import ProgressSquares from '../../Components/UI/ProgressSquares';

const CannonStats = ({ power }) => {

    const [adjustedPower, setAdjustedPower] = useState(null);

    useEffect(() => {
        switch (power) {
            case 4:
                setAdjustedPower(1);
                break;
            case 6:
                setAdjustedPower(2);
                break;
            case 8:
                setAdjustedPower(3);
                break;
            case 11:
                setAdjustedPower(4);
                break;
            case 13:
                setAdjustedPower(5);
        }
    }, [power]);

    return (
        <View>
            <Text style={styles.statText}>Power</Text>
            <ProgressSquares squareCount={1} maxAmount={4} />
        </View>
    )
}

export default CannonStats;

const styles = StyleSheet.create({
    statText: {
        margin: 0,
        fontFamily: 'textFont',
        color: colors.offWhite,
        fontSize: 14
    },
})
