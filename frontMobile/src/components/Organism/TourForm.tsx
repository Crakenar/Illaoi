import { TouchableOpacity, View, Text, StyleSheet} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";

//Services
import {
  _storeData,
  _updateData,
  _retrieveData,
  _retrieveDataNotAssigned,
} from "../../services/DatabaseService";
//Helpers
import {
  getIdsFromArray,
  idExistInArray,
  jsonStringToArray,
  transformDataForDropdownList,
} from "../../helpers/ListHelper";
//Components
import ButtonIL from "../Atoms/ButtonIL";
//Enums
import { ActionTypeId, MenuIds } from "../../enums/GlobalEnums";
import { DragListRenderItemInfo } from "react-native-draglist";
import TourCommonForm from "./TourCommonForm";
export default function TourForm({ route, navigation, item }: any) {
  //States
  const [label, setLabel] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(true);
  const [dataFromDatabase, setDataFromDatabase] = useState<any>([]);
  const [dragListData, setDragListData] = useState<any>([]);
  //dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [adressesList, setAdressesList] = useState<any>([]);
  const [selectedAdresses, setSelectedAdresses] = useState<any>(null);
  const [loadingAdresses, setLoadingAdresses] = useState<boolean>(true);

  const actionTypeId = useSelector((state: any) => {
    return state.store.actionTypeId;
  });
  //onmounted
  useEffect(() => {
    DropDownPicker.setListMode("MODAL");

    if (actionTypeId === ActionTypeId.ADD) {
      getAdresses([]);
    }

    if (actionTypeId !== ActionTypeId.ADD) {
      const listPackages = jsonStringToArray(item.adresses);
      setDataFromDatabase(listPackages);
      setDragListData(listPackages);
      const ids = getIdsFromArray(listPackages);
      getAdresses(ids);
      setLabel(item?.label);
    }

    if (actionTypeId === ActionTypeId.DETAILS) {
      setEditable(false);
    }
  }, []);

  const getAdresses = async (ids: number[]) => {
    const adressesList = await _retrieveDataNotAssigned(MenuIds.Adresses, ids);
    const listTransormed = transformDataForDropdownList(adressesList);
    setAdressesList(listTransormed);
    setLoadingAdresses(false);
  };

  const handleSubmit = async () => {
    if (actionTypeId === ActionTypeId.ADD) {
      const resStore = await _storeData(MenuIds.Tour, {
        label: label,
        adresses: selectedAdresses,
      });
      navigation.navigate("DataList", { menuId: MenuIds.Tour });
    } else if (actionTypeId === ActionTypeId.EDIT) {
      const resStore = await _updateData(MenuIds.Tour, {
        label: label,
        id: item.id,
        adresses: dragListData,
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
    const copy = [...dragListData]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setDragListData(copy);
  }

  function onSelectItemCallbackEditForm(item: any) {
    setSelectedAdresses(item);
    const mergedArray = [...new Set([...dataFromDatabase, ...item])];
    setDragListData(mergedArray);
  }

  function onSelectItemCallbackAddForm(item: any) {
    setSelectedAdresses(item);
  }

  function renderAddForm() {
    return (
      <TourCommonForm
        label={label}
        items={adressesList}
        editable={editable}
        loading={loadingAdresses}
        value={value}
        open={open}
        setLabel={setLabel}
        setValue={setValue}
        setOpen={setOpen}
        onSelectItemCallback={onSelectItemCallbackAddForm}
      />
    );
  }

  function renderEditForm() {
    return (
      <TourCommonForm
        label={label}
        items={adressesList}
        editable={editable}
        dragListData={dragListData}
        loading={loadingAdresses}
        value={value}
        open={open}
        setLabel={setLabel}
        setOpen={setOpen}
        setValue={setValue}
        renderItem={renderItem}
        onReordered={onReordered}
        keyExtractor={keyExtractor}
        onSelectItemCallback={onSelectItemCallbackEditForm}
      />
    );
  }

  function renderDetailForm() {
    return (
      <TourCommonForm
        label={label}
        items={adressesList}
        editable={editable}
        dragListData={dragListData}
        open={open}
        setLabel={setLabel}
        renderItem={renderItem}
        onReordered={onReordered}
        keyExtractor={keyExtractor}
      />
    );
  }

  function renderScreen() {
    if (actionTypeId === ActionTypeId.ADD) {
      return renderAddForm();
    } else if (actionTypeId === ActionTypeId.EDIT) {
      return renderEditForm();
    } else if (actionTypeId === ActionTypeId.DETAILS) {
      return renderDetailForm();
    }
  }

  return (
    <View style={styles.container}>
      {renderScreen()}
      {renderSubmitButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    width: "80%",
    alignItems: "center", // Centrage horizontal du bouton
    backgroundColor: "#0174BE", // Couleur de fond du bouton
    padding: 20, // Marge intérieure du bouton
    marginBottom: 10,
    borderRadius: 10, // Coins arrondis
  },
});
