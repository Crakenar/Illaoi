import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

//Services
import {
  _retrieveData,
  _deleteData,
  getTableNameFromMenuId,
} from "../services/DatabaseService";

//Components
import ButtonIL from "../components/Atoms/ButtonIL";
import TextIL from "../components/Atoms/TextIL";
import DataListItem from "../components/Organism/DataListItem";
import { setActionTypeId, setMenuId } from "../redux/storeSlice";

//Enums
import { ActionTypeId, MenuIds } from "../enums/GlobalEnums";

export default function DataListScreen({ route, navigation }: any) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { menuId } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    try {
      const dataList = await _retrieveData(menuId);
      setData(dataList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const redirectToForm = function () {
      dispatch(setActionTypeId(ActionTypeId.ADD));
      navigation.navigate("AddingForm");
  };

  function renderDataList() {
    if (data.length === 0) {
      return (
        <View>
          <ButtonIL
            text="Ajouter une donnee"
            onPressCallback={redirectToForm}
          />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.containerList}>
        <FlatList
          data={data}
          renderItem={({ item }) => <DataListItem item={item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" /> : renderDataList()}
    </View>
  );
}

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
});
