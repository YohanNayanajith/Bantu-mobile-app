import {
  View,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [startHeaderHeight, setStartHeaderHeight] = useState(80);

  useEffect(() => {
    if (Platform.OS == "android") {
      setStartHeaderHeight(50 + StatusBar.currentHeight);
    }
  }, []);
  return (
    <View
      style={{
        height: startHeaderHeight,
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          backgroundColor: "white",
          marginHorizontal: 20,
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "black",
          shadowOpacity: 0.2,
          elevation: 1,
          marginTop: Platform.OS == "android" ? 5 : null,
        }}
      >
        <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Try with Bantu"
          placeholderTextColor="grey"
          style={{ flex: 1, fontWeight: "700", backgroundColor: "white" }}
        />
      </View>
    </View>
  );
};

export default Search;
