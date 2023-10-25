import { View, Text } from "react-native";

export default function DataListScreen({ route, navigation }: any) {
  const { menuId } = route.params;
  
  return (
    <View>
      <Text>DataListScreen {menuId}</Text>
    </View>
  );
}