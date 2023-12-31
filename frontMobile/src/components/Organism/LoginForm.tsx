import React, { useState } from "react";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAvoidingView, StyleSheet, Alert} from "react-native";

import {supabase} from '../../lib/supabase';
//components
import ButtonIL from "../Atoms/ButtonIL";
import TextInputIL from "../Atoms/TextInputIL";
import ButtonContainerIL from "../Molecules/ButtonContainerIL";
import TextInputContainerIL from "../Molecules/TextInputContainerIL";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleSignUp = async () => {
    navigation.navigate("Register");
  };

  async function handleLogin () {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) { 
      Alert.alert(error.message)
    } else { 
      navigation.navigate("Home");
    }
    setLoading(false)
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TextInputContainerIL>
        <TextInputIL
          placeholder="Email Or Username"
          value={email}
          onChangeTextCallback={(text: string) => setEmail(text)}
          isSecret={false}
        />
        <TextInputIL
          placeholder="Password"
          value={password}
          onChangeTextCallback={(text: string) => setPassword(text)}
          isSecret={true}
        />
      </TextInputContainerIL>
      <ButtonContainerIL>
        <ButtonIL text="Login" onPressCallback={handleLogin} />
        <ButtonIL text="Sign Up" onPressCallback={handleSignUp} />
      </ButtonContainerIL>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
});
