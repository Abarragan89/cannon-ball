
import { View, StyleSheet } from "react-native"
import colors from "../../constants/colors";

const ProgressSquares = ({ squareCount }) => {

    const countArray = Array.from({ length: squareCount }, (x, i) => i);

    return (
        <View style={styles.container}>
            {countArray.map((item) =>
                <View key={item} style={styles.countSquare} />
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
        width: 12,
        height: 12,
        backgroundColor: colors.limeGreen,
        borderWidth: 1,
        borderColor: colors.primaryBlack,
        // marginHorizontal: .5
    },
})