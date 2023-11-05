import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";

//Services
import {
  _retrieveData,
  _retrieveDataNotAssigned,
  _storeData,
  _updateData,
} from "../../services/DatabaseService";
//Helpers
import {
  getIdsFromArray,
  idExistInArray,
  jsonStringToArray,
  transformDataForDropdownList,
} from "../../helpers/ListHelper";
//Components
import TextInputIL from "../Atoms/TextInputIL";
import ButtonIL from "../Atoms/ButtonIL";
//Enums
import { ActionTypeId, MenuIds } from "../../enums/GlobalEnums";

export default function AdressesForm({ route, navigation, item }: any) {
  //States
  const [label, setLabel] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(true);
  const [dataFromDatabase, setDataFromDatabase] = useState<any>([]);
  const [dragListData, setDragListData] = useState<any>([]);

  //dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [packages, setPackages] = useState<any>([]);
  const [selectedPackages, setSelectedPackages] = useState<any>(null);
  const [loadingPackages, setLoadingPackages] = useState<boolean>(true);
  const actionTypeId = useSelector((state: any) => {
    return state.store.actionTypeId;
  });
  //onmounted
  useEffect(() => {
    DropDownPicker.setListMode("MODAL");

    if (actionTypeId === ActionTypeId.ADD) {
      getPackages([]);
    }
    if (actionTypeId === ActionTypeId.EDIT) {
      const listPackages = jsonStringToArray(item.packages);
      setDataFromDatabase(listPackages);
      setDragListData(listPackages);
      const ids = getIdsFromArray(listPackages);
      getPackages(ids);
      setLabel(item?.label);
    }
    if (actionTypeId === ActionTypeId.DETAILS) {
      const listPackages = jsonStringToArray(item.packages);
      setEditable(false);
      setDragListData(listPackages);
      setLabel(item?.label);
    }
  }, []);

  const getPackages = async (ids: number[]) => {
    const packages = await _retrieveDataNotAssigned(MenuIds.Package, ids);
    const listTransormed = transformDataForDropdownList(packages);
    setPackages(listTransormed);
    setLoadingPackages(false);
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
        packages: dragListData,
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
    const copy = [...dragListData]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setDragListData(copy);
  }

  function renderAddForm() {
    return (
      <>
        <TextInputIL
          placeholder="Enter label"
          value={label}
          editable={editable}
          onChangeTextCallback={(text) => setLabel(text)}
        />
        <DropDownPicker
          loading={loadingPackages}
          schema={{
            label: "label",
            value: "id",
          }}
          modalProps={{
            animationType: "fade",
          }}
          modalContentContainerStyle={{
            backgroundColor: "#fff",
          }}
          searchable={false}
          modalTitle="Select multiple packages to add"
          multiple={true}
          open={open}
          value={value}
          min={0}
          items={packages}
          placeholder="Add Packages"
          setOpen={setOpen}
          setValue={setValue}
          // setItems={setSelectedAdresses}
          onSelectItem={(items: any) => {
            setSelectedPackages(items);
          }}
        />
      </>
    );
  }

  function renderEditForm() {
    return (
      <>
        <TextInputIL
          placeholder="Enter label"
          value={label}
          editable={editable}
          onChangeTextCallback={(text) => setLabel(text)}
        />
        <DropDownPicker
          loading={loadingPackages}
          schema={{
            label: "label",
            value: "id",
          }}
          modalProps={{
            animationType: "fade",
          }}
          modalContentContainerStyle={{
            backgroundColor: "#fff",
          }}
          searchable={false}
          modalTitle="Select multiple packages to add"
          multiple={true}
          open={open}
          value={value}
          min={0}
          items={packages}
          placeholder="Add Packages"
          setOpen={setOpen}
          setValue={setValue}
          onSelectItem={(item: any) => {
            setSelectedPackages(item);
            const mergedArray = [...new Set([...dataFromDatabase, ...item])];
            setDragListData(mergedArray);
          }}
        />
        <DragList
          data={dragListData}
          keyExtractor={keyExtractor}
          onReordered={onReordered}
          renderItem={renderItem}
        />
      </>
    );
  }

  function renderDetailForm() {
    return (
      <>
        <TextInputIL
          placeholder="Enter label"
          value={label}
          editable={editable}
          onChangeTextCallback={(text) => setLabel(text)}
        />
        <DragList
          data={dragListData}
          keyExtractor={keyExtractor}
          onReordered={onReordered}
          renderItem={renderItem}
        />
      </>
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
