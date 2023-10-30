import { Text, StyleSheet } from "react-native";

import TextIlPropsInterface from "@/interfaces/Atoms/TextIlInterface";

export default function TextIL(props: TextIlPropsInterface) {
  return <Text style={[styles.text, props.style]}>{props.text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
})