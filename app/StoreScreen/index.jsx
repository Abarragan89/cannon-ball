import { StyleSheet, View } from "react-native";
import { Link } from "expo-router"
import Title from "../../Components/UI/Title";
import { StatusBar } from "expo-status-bar";
import colors from "../../constants/colors";

const StoreScreen = () => {
  return (
    <View style={styles.rootContainer}>
    <StatusBar 
      style="light" 
      backgroundColor={colors.primaryBlue}  
    />
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
