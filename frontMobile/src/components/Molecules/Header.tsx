import { View, Text} from "react-native";
import HeaderPropsInterface from "../../interfaces/Molecules/HeaderInterface";
export default function Header(props: HeaderPropsInterface) {
  return (
    <View>
      <Text>Header {props.title}</Text>
    </View>
  );
}