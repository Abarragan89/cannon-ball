import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import ProgressSquares from '../../Components/UI/ProgressSquares';

const CannonStats = ({ power }) => {

    const [adjustedPower, setAdjustedPower] = useState(null);
    
    useEffect(() => {
        switch (power) {
            case 1:
                setAdjustedPower(1);
                break;
            case 1.2:
                setAdjustedPower(2);
                break;
            case 1.4:
                setAdjustedPower(3);
                break;
            case 1.6:
                setAdjustedPower(4);
                break;
        }
    }, [power]);

    return (
        <View>
            <Text style={styles.statText}>Power</Text>
            <ProgressSquares squareCount={adjustedPower} maxAmount={4} />
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
