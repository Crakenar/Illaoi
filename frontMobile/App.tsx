import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "./src/lib/supabase";
import { Session } from "@supabase/supabase-js";

//componments
import Header from "./src/components/Molecules/Header";
import HomeScreen from "./src/pages/HomeScreen";
import TourScreen from "./src/pages/TourScreen";
import AddressScreen from "./src/pages/AddressScreen";
import LoginScreen from "./src/pages/LoginScreen";
import DataListScreen from "./src/pages/DataListScreen";
import BottomNavigator from "./src/components/Organism/BottomNavigator";
import AddingFormScreen from "./src/pages/AddingFormScreen";
import ButtonIL from "./src/components/Atoms/ButtonIL";
const Stack = createNativeStackNavigator();

// options={{ headerBackVisible:false }}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const disconnect = async () => {
    await supabase.auth.signOut();
    setSession(null);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session && session.user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{
          headerRight: () => (
            <ButtonIL
              onPressCallback={ disconnect }
              text="Info"
              style={{ width: 30, height: 30, backgroundColor: "red" }}
            />
          ),}} />
            <Stack.Screen name="Adresses" component={AddressScreen} />
            <Stack.Screen name="Tournees" component={TourScreen} />
            <Stack.Screen name="DataList" component={DataListScreen} />
            <Stack.Screen name="AddingForm" component={AddingFormScreen} />
          </>
        ) : (
          <>
          <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
      {/* <BottomNavigator /> */}
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
