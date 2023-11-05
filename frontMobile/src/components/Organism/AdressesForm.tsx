import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";


//Services
import { _retrieveData, _storeData, _updateData } from "../../services/DatabaseService";
//Helpers
import { transformDataForDropdownList } from "../../helpers/ListHelper";
//Components
import TextInputIL from "../Atoms/TextInputIL";
import ButtonIL from "../Atoms/ButtonIL";
//Enums
import { ActionTypeId, MenuIds } from "../../enums/GlobalEnums";
export default function AdressesForm({ route, navigation, item }: any) {
  //States
  const [label, setLabel] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(true);
    //dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [packages, setPackages] = useState<any>([]);
    const [selectedPackages, setSelectedPackages] = useState<any>(null);
  const actionTypeId = useSelector((state: any) => {
    return state.store.actionTypeId;
  });
  //onmounted
  useEffect(() => {
    if (actionTypeId !== ActionTypeId.ADD) {
      setLabel(item.label);
    }
    if (actionTypeId === ActionTypeId.ADD) {
      getPackages();
    }
    if (actionTypeId === ActionTypeId.DETAILS) {
      setEditable(false);
    }
  }, []);

  const getPackages = async () => {
    const packages = await _retrieveData(MenuIds.Package);
    const listTransormed = transformDataForDropdownList(packages);
    setPackages(listTransormed);
  };

  const handleSubmit = async () => {
    if (actionTypeId === ActionTypeId.ADD) {
      const resStore = await _storeData(MenuIds.Adresses, { label: label, packages: selectedPackages });
      navigation.navigate("DataList", { menuId: MenuIds.Adresses });
    } else if (actionTypeId === ActionTypeId.EDIT) {
      const resStore = await _updateData(MenuIds.Adresses, { label: label, id: item.id });
      navigation.navigate("DataList", { menuId: MenuIds.Adresses });
    }
    navigation.navigate("DataList", { menuId: MenuIds.Adresses });
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
            <DropDownPicker
        schema={{
          label: 'label',
          value: 'id'
        }}
        multiple={true}
        open={open}
        value={value}
        min={0}
        items={packages}
        placeholder="Select Packages"
        setOpen={setOpen}
        setValue={setValue}
        // setItems={setSelectedAdresses}
        onSelectItem={(items : any) => {
          setSelectedPackages(items);
        }}
      />
      {renderSubmitButton()}
    </View>
  );
}

