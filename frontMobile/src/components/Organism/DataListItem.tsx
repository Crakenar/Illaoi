import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { _deleteData } from "../../services/DatabaseService";
import { setActionTypeId } from "../../redux/storeSlice";
import { ActionTypeId } from "../../enums/GlobalEnums";
export default function DataListItem(props: any) {
  const dispatch = useDispatch();
  const menuId = useSelector((state: any) => {
    return state.store.menuId;
  });
  const deleteData = async (item: any) => {    
    const res = await _deleteData(menuId, { id: item.id });
    if (!res) {
      Alert.alert("Error", "Failed to delete data");
    }
  };

  const goToDetails = () => {
    dispatch(setActionTypeId(ActionTypeId.DETAILS));
    props.navigation.navigate("AddingForm", { item: props.item });
  };

  const goToEdit = () => {
    dispatch(setActionTypeId(ActionTypeId.EDIT));
    props.navigation.navigate("AddingForm", { item: props.item });
  }

  return (
    <View style={styles.listItem}>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Entypo onPress={goToDetails} name="eye" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{props.item.label}</Text>
        <Text>{props.item.position}</Text>
      </View>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <FontAwesome
        onPress={goToEdit}
          name="pencil-square"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Ionicons
          onPress={() => deleteData(props.item)}
          name="trash-bin"
          size={24}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
});
