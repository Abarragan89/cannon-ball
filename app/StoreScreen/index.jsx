import { StyleSheet, View } from "react-native";
import { Link } from "expo-router"
import Title from "../../Components/UI/Title";
import colors from "../../constants/colors";

const StoreScreen = () => {
  return (
    <View style={styles.rootContainer}>
        <Title>Store</Title>
        <Link href="/">Back To Home</Link>
    </View>
  )
}

export default StoreScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  }
})
