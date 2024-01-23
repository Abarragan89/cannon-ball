import { Text, View } from "react-native";
import { Link } from "expo-router"

const StoreScreen = () => {
  return (
    <View>
        <Text>This is the Store Screen</Text>
        <Link href="/">Back To Home</Link>
    </View>
  )
}

export default StoreScreen;
