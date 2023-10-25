import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import Header from "./src/components/Molecules/Header";
import HomeScreen from "./src/pages/HomeScreen";
import TourScreen from "./src/pages/TourScreen";
import AddressScreen from "./src/pages/AddressScreen";
import LoginScreen from "./src/pages/LoginScreen";
import DataListScreen from "./src/pages/DataListScreen";
const Stack = createNativeStackNavigator();
// options={{ headerBackVisible:false }}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen  name="Home" component={HomeScreen} />
        <Stack.Screen name="Adresses" component={AddressScreen} />
        <Stack.Screen name="Tournees" component={TourScreen} />
        <Stack.Screen name="DataList" component={DataListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
