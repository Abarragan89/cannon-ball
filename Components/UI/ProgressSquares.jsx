
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
import colors from "../../constants/colors";

const ProgressSquares = ({ squareCount }) => {

    const [countArray, setCountArray] = useState(null);

    useEffect(() => {
        setCountArray(Array.from({ length: 5 }, (x, i) => i));
    }, [squareCount])
    
    return (
        <View style={styles.container}>
            {squareCount && countArray && countArray.map((item) =>
                <View key={item} style={[styles.countSquare, item >= squareCount && styles.emptyCountSquare]} />
            )}
        </View>
    )
}

export default ProgressSquares

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    countSquare: {
        width: 11,
        height: 11,
        backgroundColor: colors.limeGreen,
        borderWidth: 1,
        borderColor: colors.primaryBlack,
        marginHorizontal: .5
    },
    emptyCountSquare: { 
        backgroundColor: 'transparent'
    },
})