import ButtonIlPropsInterface from "@/interfaces/Atoms/ButtonIlInterface";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";

export default function ButtonIL(props: ButtonIlPropsInterface) {
  return (
    <TouchableOpacity onPress={props.onPressCallback} style={styles.button}>
      <Text style={styles.buttonText}>{props.text}</Text>
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
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
})