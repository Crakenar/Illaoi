import { View } from "react-native";
import { useState } from "react";
//Services
import { _storeData } from "../../services/DatabaseService";
//Components
import TextInputIL from "../Atoms/TextInputIL";
import ButtonIL from "../Atoms/ButtonIL";
//Enums
import { MenuIds } from "../../enums/GlobalEnums";
export default function TourForm({ navigation, route }: any) {
  const [label, setLabel] = useState("");

  const handleSubmit = async () => {
    const res = await _storeData(MenuIds.Tour, { label: label });
    navigation.navigate("DataList", { menuId: MenuIds.Tour });
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
