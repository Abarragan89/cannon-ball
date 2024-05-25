import { StyleSheet, View, Text } from "react-native"

const ModalDetaiItemContainer = ({ itemName, itemAmount, hasBorder = 1, operation }) => {

    return (
        <View style={[styles.itemContainer, styles.itemContainerUnderline, { borderBottomWidth: hasBorder }]}>
            <Text style={styles.detailText}>{itemName}</Text>
            {hasBorder === 1 &&
                <Text style={styles.detailText}>{operation}</Text>
            }
            <Text style={styles.detailText}>{itemAmount}</Text>
        </View>
    )
}

export default ModalDetaiItemContainer;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
        width: 250,
    },
    itemContainerUnderline: {
        borderBottomColor: colors.skyColor,
        borderBottomWidth: 1,
    },
    detailText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'textFont'
    },
})
