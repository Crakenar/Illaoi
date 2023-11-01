import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import { supabase } from "../lib/supabase";

//Components
import ButtonIL from "../components/Atoms/ButtonIL";
import TextInputIL from "../components/Atoms/TextInputIL";
import ButtonContainerIL from "../components/Molecules/ButtonContainerIL";
import TextInputContainerIL from "../components/Molecules/TextInputContainerIL";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
        Alert.alert("Veuillez verifier votre addresse mail");
      }
    }
    setLoading(false);
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
        <TextInputIL
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChangeTextCallback={(text: string) => setPasswordConfirm(text)}
          isSecret={true}
        />
      </TextInputContainerIL>
      <ButtonContainerIL>
        <ButtonIL
          text="Sign Up"
          disabled={
            password !== passwordConfirm ||
            loading ||
            email === "" ||
            password === "" ||
            passwordConfirm === ""
          }
          onPressCallback={handleSignUp}
        />
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
