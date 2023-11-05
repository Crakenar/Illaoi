import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";

//Services
import {
  _retrieveData,
  _storeData,
  _updateData,
} from "../../services/DatabaseService";
//Helpers
import { jsonStringToArray, transformDataForDropdownList } from "../../helpers/ListHelper";
//Components
import TextInputIL from "../Atoms/TextInputIL";
import ButtonIL from "../Atoms/ButtonIL";
//Enums
import { ActionTypeId, MenuIds } from "../../enums/GlobalEnums";
const SOUND_OF_SILENCE = ["hello", "darkness", "my", "old", "friend"];

export default function AdressesForm({ route, navigation, item }: any) {
  //States
  const [label, setLabel] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);

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
      const listPackages = jsonStringToArray(item.packages);
      setData(listPackages);
    }
  }, []);

  const getPackages = async () => {
    const packages = await _retrieveData(MenuIds.Package);
    const listTransormed = transformDataForDropdownList(packages);
    setPackages(listTransormed);
  };

  const handleSubmit = async () => {
    if (actionTypeId === ActionTypeId.ADD) {
      const resStore = await _storeData(MenuIds.Adresses, {
        label: label,
        packages: selectedPackages,
      });
      navigation.navigate("DataList", { menuId: MenuIds.Adresses });
    } else if (actionTypeId === ActionTypeId.EDIT) {
      const resStore = await _updateData(MenuIds.Adresses, {
        label: label,
        id: item.id,
      });
      navigation.navigate("DataList", { menuId: MenuIds.Adresses });
    }
    navigation.navigate("DataList", { menuId: MenuIds.Adresses });
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

  function keyExtractor(itemObj: any) {
    return itemObj.id;
  }

  function renderItem(info: DragListRenderItemInfo<any>) {
    const { item, onDragStart, onDragEnd, isActive } = info;
    return (
      <TouchableOpacity
        key={item.id}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}
        style={styles.buttonContainer}
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  }

  async function onReordered(fromIndex: number, toIndex: number) {
    const copy = [...data]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setData(copy);
  }

  return (
    <View  style={styles.container}>
      <TextInputIL
        placeholder="Enter label"
        value={label}
        editable={editable}
        onChangeTextCallback={(text) => setLabel(text)}
      />
      {editable ? (
        <DropDownPicker
        schema={{
          label: "label",
          value: "id",
        }}
        modalProps={{
          animationType: "fade"
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
        onSelectItem={(items: any) => {
          setSelectedPackages(items);
        }}
      />
      ) : (
        <DragList
        data={data}
        keyExtractor={keyExtractor}
        onReordered={onReordered}
        renderItem={renderItem}
      />
      )}
      {renderSubmitButton()}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center', // Centrage horizontal du bouton
    backgroundColor: '#0174BE', // Couleur de fond du bouton
    padding: 20, // Marge intérieure du bouton
    marginBottom: 10,
    borderRadius: 10, // Coins arrondis
  },
});
