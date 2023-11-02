import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, StatusBar} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';

import { _retrieveData, getTableNameFromMenuId } from "../services/DatabaseService";

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
      <SafeAreaView style={styles.containerList}>
      <FlatList
        data={data}
        renderItem={({item}) => <TextIL text={item.label} style={styles.title}/>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
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
  },
  containerList: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'green',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: 'black',
  },
});
