import { View, StyleSheet } from "react-native";
import ButtonContainerIlChildrenInterface from "@/interfaces/Molecules/ButtonContainerIlInterface";

export default function ButtonContainerIL({ children } : ButtonContainerIlChildrenInterface) {
  return (
    <View style={styles.buttonContainer}>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});