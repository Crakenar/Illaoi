import { TableNamesEnum } from "../enums/DatabaseEnums";
import { MenuIds } from "../enums/GlobalEnums";
import { supabase } from "../lib/supabase";

export async function _retrieveData(menuId: MenuIds) {
  const { data } = await supabase.auth.refreshSession();
  const { user } = data;
  try {
    const tableName = getTableNameFromMenuId(menuId);
    let { data: dataList, error } = await supabase
      .from(tableName)
      .select()
      .eq("user_id", user?.id); //not needed bc of the rules in the supabase db but we never know
    if (error) {
      console.error(error);
    }
    
    return dataList ?? [];
  } catch (error) {
    // Error retrieving data
  }
}

export async function _storeData(menuId: MenuIds, data: any) {
  try {
    const tableName = getTableNameFromMenuId(menuId);
    const { error } = await supabase.from(tableName).insert(data);
    if (error) {
      console.error(error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
    // Error storing data
  }
}

export async function _deleteData(menuId: MenuIds, data: any) {
  try {
    const tableName = getTableNameFromMenuId(menuId);
    const { error } = await supabase.from(tableName).delete().match({"id": data.id});
    if (error) {
      console.error(error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
    // Error storing data
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
