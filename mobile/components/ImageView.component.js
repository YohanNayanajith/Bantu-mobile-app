import React from "react";
import { View, Image, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const ImageView = () => {
  return (
    <View style={{ width: width - 40, height: 200, marginTop: 10 }}>
      <Image
        style={{
          flex: 1,
          height: null,
          width: null,
          resizeMode: "cover",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#dddddd",
        }}
        source={{ uri: "https://res.cloudinary.com/midefulness/image/upload/v1657441706/cld-sample-3.jpg" }}
      />
    </View>
  );
};

export default ImageView;
