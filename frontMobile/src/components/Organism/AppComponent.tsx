import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Session } from "@supabase/supabase-js";
//Libraries
import { supabase } from "../../lib/supabase";
//Components
import HomeScreen from "../../pages/HomeScreen";
import TourScreen from "../../pages/TourScreen";
import AddressScreen from "../../pages/AddressScreen";
import LoginScreen from "../../pages/LoginScreen";
import DataListScreen from "../../pages/DataListScreen";
import AddingFormScreen from "../../pages/AddingFormScreen";
import ButtonIL from "../../components/Atoms/ButtonIL";
import RegisterScreen from "../../pages/RegisterScreen";

//Store
import { MenuIds } from "../../enums/GlobalEnums";

const Stack = createNativeStackNavigator();

export default function AppComponent() {
  const [session, setSession] = useState<Session | null>(null);
  const menuId = useSelector((state: any) => {
    return state.store.menuId;
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
  };
  const redirectToForm = function (navigation: any) {
    if (session?.user && menuId) {
      console.log("menuId", menuId);
      navigation.navigate("AddingForm")
    }
  };

  
  const renderingTitleForm = () => {
    if (menuId === MenuIds.Package) {
      return "Package";
    } else if (menuId === MenuIds.Adresses) {
      return "Adresses";
    } else if (menuId === MenuIds.Tour) {
      return "Tour";
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session && session.user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerRight: () => (
                  <ButtonIL
                    onPressCallback={disconnect}
                    text="Info"
                    style={{ width: 30, height: 30, backgroundColor: "red" }}
                  />
                ),
              }}
            />
            <Stack.Screen name="Adresses" component={AddressScreen} />
            <Stack.Screen name="Tournees" component={TourScreen} />
            <Stack.Screen
              name="DataList"
              component={DataListScreen}
              options={({ navigation }) => ({
                title: 'Liste : ' + renderingTitleForm(),
                headerRight: () => (
                  <ButtonIL
                    onPressCallback={() => redirectToForm(navigation)}
                    text={menuId}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                ),
              })}
            />
            <Stack.Screen name="AddingForm" component={AddingFormScreen} options={{ title: 'Ajout : ' + renderingTitleForm() }} />
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
