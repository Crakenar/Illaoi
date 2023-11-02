import { View } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

//Services
import { _storeData } from "../../services/DatabaseService";
//Components 
import TextInputIL from "../Atoms/TextInputIL";
import ButtonIL from "../Atoms/ButtonIL";
//Enums
import { MenuIds } from "../../enums/GlobalEnums";
export default function PackageForm({ route, navigation }: any) {

  const [label, setLabel] = useState("");
  // const navigation = useNavigation();
  
  const handleSubmit = () => {
    console.log("Label:", label);
    const resStore = _storeData(MenuIds.Package, { label: label });
    navigation.navigate("DataList", { menuId: MenuIds.Package });
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