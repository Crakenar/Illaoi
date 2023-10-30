import ButtonIlPropsInterface from "@/interfaces/Atoms/ButtonIlInterface";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import TextIL from "./TextIL";

export default function ButtonIL(props: ButtonIlPropsInterface) {
  return (
    <TouchableOpacity onPress={props.onPressCallback} style={[styles.button, props.style]}>
      <TextIL text={props.text}></TextIL>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
})