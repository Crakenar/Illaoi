import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Session } from "@supabase/supabase-js";
import { Entypo } from "@expo/vector-icons";

//Libraries
import { supabase } from "../../lib/supabase";
//Components
import HomeScreen from "../../pages/HomeScreen";
import LoginScreen from "../../pages/LoginScreen";
import DataListScreen from "../../pages/DataListScreen";
import AddingFormScreen from "../../pages/AddingFormScreen";
import ButtonIL from "../../components/Atoms/ButtonIL";
import RegisterScreen from "../../pages/RegisterScreen";

//Store
import { MenuIds } from "../../enums/GlobalEnums";
import { setActionType } from "../../redux/storeSlice";

const Stack = createNativeStackNavigator();

export default function AppComponent() {
  const dispatch = useDispatch();
  const [session, setSession] = useState<Session | null>(null);
  const menuId = useSelector((state: any) => {
    return state.store.menuId;
  });

  const actionType = useSelector((state: any) => {
    return state.store.actionType;
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
      dispatch(setActionType("ADD"));
      navigation.navigate("AddingForm");
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
  };

  const renderingActionType = () => {
    return actionType;
  };

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
                  <Entypo
                    onPress={disconnect}
                    name="log-out"
                    size={24}
                    color="black"
                  />
                ),
              }}
            />
            <Stack.Screen
              name="DataList"
              component={DataListScreen}
              options={({ navigation }) => ({
                title: "Liste : " + renderingTitleForm(),
                headerRight: () => (
                  <Entypo
                    onPress={() => redirectToForm(navigation)}
                    name="add-to-list"
                    size={24}
                    color="black"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddingForm"
              component={AddingFormScreen}
              options={{
                title: renderingActionType() + " : " + renderingTitleForm(),
              }}
            />
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
