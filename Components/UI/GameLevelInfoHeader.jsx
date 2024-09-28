import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const GameLevelInfoHeader = ({ mapName, levelNumber}) => {
  return (
    <View style={styles.root}>
        <Text style={styles.text}>{mapName}</Text>
        <Text style={styles.text}>Level</Text>
        <Text style={styles.text}>{levelNumber}</Text>
    </View>
  )
}

export default GameLevelInfoHeader;


const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        bottom: 7,
        right: 20,
        flexDirection: 'row'
    },
    text: {
        color: colors.offWhite,
        fontFamily: 'textFont',
        fontSize: 20,
        letterSpacing: 2,
        marginHorizontal: 10,
    }
})