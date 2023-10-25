import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function TourScreen({ navigation } : any) {
  return (
    <View>
      <Text>Tour Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}