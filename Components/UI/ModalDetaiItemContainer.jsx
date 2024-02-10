import { StyleSheet, View, Text } from "react-native"

const ModalDetaiItemContainer = ({ itemName, itemAmount, hasBorder = 1 }) => {

    return (
        <View style={[styles.itemContainer, styles.itemContainerUnderline, { borderBottomWidth: hasBorder }]}>
            <Text style={styles.detailText}>{itemName}</Text>
            {hasBorder === 1 &&
                <Text style={styles.detailText}>X</Text>
            }
            <Text style={styles.detailText}>{itemAmount}</Text>
        </View>
    )
}

export default ModalDetaiItemContainer;



const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-between',
        width: 200,
    },
    itemContainerUnderline: {
        borderBottomColor: 'yellow',
        borderBottomWidth: 1,
    },
    detailText: {
        fontSize: 15,
        color: 'white'
    },
})
