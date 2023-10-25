import { View, StyleSheet } from "react-native";
import TextInputContainerIlChildrenInterface from "@/interfaces/Molecules/TextInputContainerIlInterface";

export default function TextInputContainerIL({ children } : TextInputContainerIlChildrenInterface) {
  return (
    <View style={styles.container}>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  width: "80%",
 }
});