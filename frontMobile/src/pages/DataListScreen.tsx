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

import {
  _retrieveData,
  _deleteData,
  getTableNameFromMenuId,
} from "../services/DatabaseService";

//Components
import ButtonIL from "../components/Atoms/ButtonIL";
import TextIL from "../components/Atoms/TextIL";

export default function DataListScreen({ route, navigation }: any) {
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

  function Item({ item } : any) {
    return (
      <View style={styles.listItem}>
        <Entypo name="eye" size={24} color="black" />
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{item.label}</Text>
          <Text>{item.position}</Text>
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
          <FontAwesome  name="pencil-square" size={24} color="black" style={{ marginRight: 10 }} />
          <Ionicons onPress={() => deleteData(item)} name="trash-bin" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  }

  const deleteData = async (item: any) => {
    console.log("deleteData", item);
    
    const res = await _deleteData(menuId, { id: item.id });
    if (!res) {
      Alert.alert("Error", "Failed to delete data");
    } else {
      fetchData();
    }
  }

  function renderDataList() {
    if (data.length === 0) {
      return (
        <View>
          <ButtonIL
            text="Ajouter une donnee"
            onPressCallback={() =>
              navigation.navigate("AddingForm", { menuId: menuId })
            }
          />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.containerList}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item item={item} />}
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
