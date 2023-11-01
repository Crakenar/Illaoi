import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useSelector } from "react-redux";
import { Session } from "@supabase/supabase-js";

import HomeScreen from "../../pages/HomeScreen";
import TourScreen from "../../pages/TourScreen";
import AddressScreen from "../../pages/AddressScreen";
import LoginScreen from "../../pages/LoginScreen";
import DataListScreen from "../../pages/DataListScreen";
import BottomNavigator from "../../components/Organism/BottomNavigator";
import AddingFormScreen from "../../pages/AddingFormScreen";
import ButtonIL from "../../components/Atoms/ButtonIL";
import RegisterScreen from "../../pages/RegisterScreen";
const Stack = createNativeStackNavigator();

export default function AppComponent() {

  const [session, setSession] = useState<Session | null>(null);
  const menuId = useSelector((state: any) => {    
    return state.store.menuId
  });

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
  const redirectToForm = function() {
    console.log("go to form adding");
    
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
            <Stack.Screen name="DataList" component={DataListScreen} options={{
              headerRight: () => (
                <ButtonIL
              onPressCallback={ redirectToForm }
              text={menuId}
              style={{ width: 30, height: 30, backgroundColor: "yellow", color:'black' }}
            />
              ),
            }} />
            <Stack.Screen name="AddingForm" component={AddingFormScreen} />
          </>
        ) : (
          <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
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