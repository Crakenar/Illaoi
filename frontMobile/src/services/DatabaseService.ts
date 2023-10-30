import { TableNamesEnum } from "../enums/DatabaseEnums";
import { MenuIds } from "../enums/GlobalEnums";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function _retrieveData(menuId: MenuIds) {
  try {
    const tableName = getTableNameFromMenuId(menuId);
    const value = await AsyncStorage.getItem(tableName);
    // Our data is fetched successfully
    console.log(value);
    return value != null ? JSON.parse(value) : [];
  } catch (error) {
    // Error retrieving data
  }
}

export async function _storeData(menuId: MenuIds, data: any) {
  try {
    const tableName = getTableNameFromMenuId(menuId);
    let res = await _retrieveData(menuId);
    console.log(res.length);
    
    if (res.length > 0) {
      res.push(...data);
    } else {
      res = data;
    }
    await AsyncStorage.setItem(tableName, JSON.stringify(res));
    return true;
  } catch (error) {
    // Error storing data
    console.error(error);
  }
}

export function getTableNameFromMenuId(menuId: MenuIds): string {
  switch (menuId) {
    case MenuIds.Package:
      return TableNamesEnum.Package;
    case MenuIds.Adresses:
      return TableNamesEnum.Adresses;
    case MenuIds.Tour:
      return TableNamesEnum.Tour;
    default:
      return ""; // Handle cases where the menuId is not found
  }
}
