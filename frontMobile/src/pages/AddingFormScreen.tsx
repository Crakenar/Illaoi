import { View, Text, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import ButtonIL from "../components/Atoms/ButtonIL";
import TextInputIl from "../components/Atoms/TextInputIL";
import { _storeData } from "../services/DatabaseService";

export default function AddingFormScreen({ route, navigation }: any) {
  const { menuId } = route.params;
  const [label, setLabel] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = () => {
    console.log("Label:", label);
    console.log("Number:", number);
    const resStore = _storeData(menuId, { label: label, number: number });
    navigation.navigate("DataList", { menuId: menuId });
  };
  return (
    <View>
      <TextInputIl
        placeholder="Enter label"
        value={label}
        onChangeTextCallback={(text) => setLabel(text)}
      />

      <TextInputIl
        placeholder="Enter number"
        value={number}
        onChangeTextCallback={(text) => setNumber(text)}
      />
      <ButtonIL text="Submit" onPressCallback={handleSubmit} />
    </View>
  );
}
