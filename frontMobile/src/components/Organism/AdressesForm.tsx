import { View } from "react-native";
import { useState } from "react";
//Services
import { _storeData } from "../../services/DatabaseService";
//Components
import TextInputIL from "../Atoms/TextInputIL";
import ButtonIL from "../Atoms/ButtonIL";
//Enums
import { MenuIds } from "../../enums/GlobalEnums";
export default function AdressesForm({ navigation }: any) {
  const [label, setLabel] = useState("");

  const handleSubmit = () => {
    console.log("Label:", label);
    const resStore = _storeData(MenuIds.Adresses, { label: label });
    navigation.navigate("DataList", { menuId: MenuIds.Adresses });
  };

  return (
    <View>
      <TextInputIL
        placeholder="Enter label"
        value={label}
        onChangeTextCallback={(text) => setLabel(text)}
      />
      <ButtonIL text="Submit" onPressCallback={handleSubmit} />
    </View>
  );
}
