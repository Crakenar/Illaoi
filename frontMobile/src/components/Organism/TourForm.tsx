import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";

//Services
import {
  _storeData,
  _updateData,
  _retrieveData,
} from "../../services/DatabaseService";
//Helpers
import { transformDataForDropdownList } from "../../helpers/ListHelper";
//Components
import TextInputIL from "../Atoms/TextInputIL";
import ButtonIL from "../Atoms/ButtonIL";
//Enums
import { ActionTypeId, MenuIds } from "../../enums/GlobalEnums";
export default function TourForm({ route, navigation, item }: any) {
  //States
  const [label, setLabel] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(true);
  //dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [adressesList, setAdressesList] = useState<any>([]);
  const [selectedAdresses, setSelectedAdresses] = useState<any>(null);
  const actionTypeId = useSelector((state: any) => {
    return state.store.actionTypeId;
  });
  //onmounted
  useEffect(() => {    
    
    if (actionTypeId !== ActionTypeId.ADD) {
      setLabel(item?.label);      
    }
    if (actionTypeId === ActionTypeId.ADD) {
      getAdresses();
    }
    if (actionTypeId === ActionTypeId.DETAILS) {
      setEditable(false);
    }
  }, []);

  const getAdresses = async () => {
    const adressesList = await _retrieveData(MenuIds.Adresses);
    const listTransormed = transformDataForDropdownList(adressesList);
    setAdressesList(listTransormed);
  };

  const handleSubmit = async () => {
    if (actionTypeId === ActionTypeId.ADD) {      
      const resStore = await _storeData(MenuIds.Tour, { label: label, adresses: selectedAdresses });
      navigation.navigate("DataList", { menuId: MenuIds.Tour });
    } else if (actionTypeId === ActionTypeId.EDIT) {
      const resStore = await _updateData(MenuIds.Tour, {
        label: label,
        id: item.id,
      });
      navigation.navigate("DataList", { menuId: MenuIds.Tour });
    }
    navigation.navigate("DataList", { menuId: MenuIds.Tour });
  };

  const renderSubmitButton = () => {
    if (editable) {
      return (
        <ButtonIL
          text="Submit"
          onPressCallback={handleSubmit}
          disabled={!editable}
        />
      );
    }
  };

  return (
    <View>
      <TextInputIL
        placeholder="Enter label"
        value={label}
        editable={editable}
        onChangeTextCallback={(text) => setLabel(text)}
      />
      <DropDownPicker
        schema={{
          label: 'label',
          value: 'id'
        }}
        multiple={true}
        open={open}
        value={value}
        min={0}
        items={adressesList}
        placeholder="Select Adresses"
        setOpen={setOpen}
        setValue={setValue}
        // setItems={setSelectedAdresses}
        onSelectItem={(items : any) => {
          setSelectedAdresses(items);
        }}
      />
      {renderSubmitButton()}
    </View>
  );
}
