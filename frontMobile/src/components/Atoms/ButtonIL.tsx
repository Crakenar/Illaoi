import ButtonIlPropsInterface from "@/interfaces/Atoms/ButtonIlInterface";
import { View, Text, Button, StyleSheet, TouchableOpacity} from "react-native";
import TextIL from "./TextIL";

export default function ButtonIL(props: ButtonIlPropsInterface) {
  const buttonStyles = props.disabled ? styles.disabledButton : styles.button;

  return (
    <TouchableOpacity onPress={props.onPressCallback} style={[buttonStyles, props.style]}>
      <TextIL text={props.text}></TextIL>
    </TouchableOpacity>
      // <Button title={props.text} onPress={props.onPressCallback} style={[styles.button, props.style]}></Button>
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
  disabledButton:{
    backgroundColor: "gray",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
})