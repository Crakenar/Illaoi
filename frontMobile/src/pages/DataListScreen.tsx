import { _retrieveData, getTableNameFromMenuId } from "../services/DatabaseService";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet} from "react-native";
import ButtonIL from "../components/Atoms/ButtonIL";

export default function DataListScreen({ route, navigation }: any) {
  const { menuId } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const responseJson = await _retrieveData(menuId);
      setData(responseJson);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function renderDataList() {
    if (data.length === 0) {
      return (
        <View>
          <Text>Aucune donnees pour {getTableNameFromMenuId(menuId)}</Text>
          <ButtonIL
           text="Ajouter une donnee"
           onPressCallback={() => navigation.navigate("AddingForm", { menuId: menuId })}
          />
        </View>
      );
    }
    return (
      <View>
        <Text>DataListScreen {menuId}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? (<ActivityIndicator size="large" />) : (renderDataList())}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
