import { View } from "react-native";
import React, { useEffect, useState } from "react";

//Services
import { _storeData } from "../../services/DatabaseService";
//Components
import TextInputIL from "../Atoms/TextInputIL";
import ButtonIL from "../Atoms/ButtonIL";
//Enums
import { MenuIds } from "../../enums/GlobalEnums";
export default function PackageForm({ route, navigation, item }: any) {
  const [label, setLabel] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(true);
  //onmounted
  useEffect(() => {
    if (item) {
      setLabel(item.label);
      setEditable(false);
    }
  }, [])

  const handleSubmit = () => {
    const resStore = _storeData(MenuIds.Package, { label: label });
    navigation.navigate("DataList", { menuId: MenuIds.Package });
  };

  const renderSubmitButton = () => {
    if (editable) {
      return <ButtonIL text="Submit" onPressCallback={handleSubmit} disabled={!editable} />;
    }
  }

  return (
    <View>
      <TextInputIL
        placeholder="Enter label"
        value={label}
        editable={editable}
        onChangeTextCallback={(text) => setLabel(text)}
      />
      {renderSubmitButton()}
    </View>
  );
}
