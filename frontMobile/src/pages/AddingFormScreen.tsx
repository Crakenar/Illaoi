import { useSelector } from "react-redux";

//Services
import { _storeData } from "../services/DatabaseService";
//Components
import ButtonIL from "../components/Atoms/ButtonIL";
import TextInputIl from "../components/Atoms/TextInputIL";
import PackageForm from "../components/Organism/PackageForm";
import AdressesForm from "../components/Organism/AdressesForm";
import TourForm from "../components/Organism/TourForm";
//Enums
import { MenuIds } from "../enums/GlobalEnums";
import { View } from "react-native";

export default function AddingFormScreen({ route, navigation }: any) {
  
  const menuId = useSelector((state: any) => {
    return state.store.menuId;
  });

  function renderingForm() {
    if (menuId === MenuIds.Package) {
      return <PackageForm navigation={navigation}/>;
    } else if (menuId === MenuIds.Adresses) {
      return <AdressesForm navigation={navigation} />;
    } else if (menuId === MenuIds.Tour) {
      return <TourForm navigation={navigation} />;
    }
  }

  return (
    <View>
        {renderingForm()}
    </View>
  );
}
