import HomeScreen from "../../pages/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
export default function BottomNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}
