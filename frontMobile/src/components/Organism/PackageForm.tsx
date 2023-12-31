import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Services
import { _storeData, _updateData } from "../../services/DatabaseService";
//Components
import TextInputIL from "../Atoms/TextInputIL";
import ButtonIL from "../Atoms/ButtonIL";
//Enums
import { ActionTypeId, MenuIds } from "../../enums/GlobalEnums";
export default function PackageForm({ route, navigation, item }: any) {
  //States
  const [label, setLabel] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(true);
  const actionTypeId = useSelector((state: any) => {
    return state.store.actionTypeId;
  });
  //onmounted
  useEffect(() => {
    if (actionTypeId !== ActionTypeId.ADD) {
      setLabel(item.label);
    }
    if (actionTypeId === ActionTypeId.DETAILS) {
      setEditable(false);
    }
  }, [])

  const handleSubmit = async () => {
    if (actionTypeId === ActionTypeId.ADD) {
      const resStore = await _storeData(MenuIds.Package, { label: label });
      navigation.navigate("DataList", { menuId: MenuIds.Package });
    } else if (actionTypeId === ActionTypeId.EDIT) {
      const resStore = await _updateData(MenuIds.Package, { label: label, id: item.id });
      navigation.navigate("DataList", { menuId: MenuIds.Package });
    }
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
