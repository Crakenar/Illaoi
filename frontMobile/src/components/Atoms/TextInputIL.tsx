import { StyleSheet, TextInput } from "react-native";

import TextInputPropsInterface from "@/interfaces/Atoms/TextInputIlInterface";
export default function TextInputIL(props: TextInputPropsInterface) {
  return (
    <TextInput
      value={props.value}
      onChangeText={props.onChangeTextCallback}
      secureTextEntry={props.isSecret}
      placeholder={props.placeholder}
      style={styles.input}
      editable={props.editable}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});
