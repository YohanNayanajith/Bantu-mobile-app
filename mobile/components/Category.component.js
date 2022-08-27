import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Category = ({imageUri,name}) => {
  return (
    <View
      style={{
        height: 130,
        width: 130,
        marginLeft: 20,
        borderWidth: 0.5,
        borderColor: "#dddddd",
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "black",
        shadowOpacity: 0.2,
        elevation: 2,
        borderRadius:5,
      }}
    >
      <View style={{ flex: 2 }}>
        <Image
          source={imageUri}
          style={{ flex: 1, width: null, height: null, resizeMode: "cover" }}
        />
      </View>
      <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
        <Text>{name}</Text>
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
