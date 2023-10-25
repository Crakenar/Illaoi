import { Text, StyleSheet } from "react-native";

import TextIlPropsInterface from "@/interfaces/Atoms/TextIlInterface";

export default function TextIL(props: TextIlPropsInterface) {
  return <Text style={[props.style, styles.text]}>{props.text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
})