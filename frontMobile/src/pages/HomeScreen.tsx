import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import CardIL from "../components/Molecules/CardIL";
import ButtonContainerIL from "../components/Molecules/ButtonContainerIL";
import ButtonIL from "../components/Atoms/ButtonIL";
import MenuInterface from "@/interfaces/MenuInterface";
import { MenuIds } from "../enums/GlobalEnums";

export default function HomeScreen({ navigation }: any) {
  const DATA: MenuInterface[] = [
    {
      id: MenuIds.Tour,
      title: "Voir mes tournees",
      redirectLink: "DataList",
    },
    {
      id: MenuIds.Adresses,
      title: "Voir mes adresses",
      redirectLink: "DataList",
    },
    {
      id: MenuIds.Package,
      title: "Voir mes colis",
      redirectLink: "DataList",
    },
  ];

  return (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          // <CardIL style={styles.item} title={item.title} />
          <ButtonIL text={item.title} onPressCallback={() => navigation.navigate(item.redirectLink, {menuId: item.id})}></ButtonIL>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <StatusBar style="auto" />
      {/* <ButtonContainerIL>
        <ButtonIL text="Voir mes tournees" onPressCallback={() => {}}></ButtonIL>
      </ButtonContainerIL> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   marginTop: 20,
  //   marginBottom: 20,
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: "column",
  //   // flexWrap: 'wrap',
  //   // alignItems: 'flex-start',
  // },
  // item: {
  //   width: "100%",
  //   height: 150,
  //   margin: 5,
  //   backgroundColor: "rgba(0,0,0, 0.3)",
  // },
  //yi
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 0,
  },
  item: {},
  title: {
    fontSize: 32,
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // buttonContainer: {
  //   flex: 1,
  //   width: '100%',
  // },
  // button: {
  //   backgroundColor: 'blue', // Couleur du bouton
  //   width: '50%', // Largeur de 100% de l'écran
  //   height: '50%', // Hauteur de 100% de l'écran
  // },
  // buttonText: {
  //   fontSize: 20,
  // },
});
