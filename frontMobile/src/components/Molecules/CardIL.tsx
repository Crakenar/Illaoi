import { View, Text, StyleSheet, Image } from "react-native";
import TextIL from "../Atoms/TextIL";
export default function CardIL(props: any) {
  return (
    <Button style={[props.style]} onPress={props.onPressCallback}>
      <View style={styles.card_template}>
        {/* <Image
          style={styles.card_image}
          source={{
            uri: "https://www.online-image-editor.com/styles/2019/images/power_girl.png",
          }}
        /> */}
        <View style={styles.text_container}>
          <TextIL text={props.title}></TextIL>
        </View>
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  card_template: {
    height: 100,
    // backgroundColor: "rgba(0,0,0, 0.3)",
    // width: '100%',
    // marginVertical: 8,
    // marginHorizontal: 16,
    // boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  // card_image: {
  //   width: 140,
  //   height: 140,
  //   borderRadius: 10,
  // },
  text_container: {
    // position: "absolute",
    height: 30,
    bottom: 0,
    padding: 5,
    backgroundColor: "rgba(0,0,0, 0.3)",
    borderRadius: 10,
  },
  // card_title: {
  //   color: "white",
  // },
});
