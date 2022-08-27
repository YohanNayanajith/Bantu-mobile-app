import { View, Text, ScrollView } from "react-native";
import React from "react";
import Category from "../components/Category.component";
import { COLORS } from "../constans";

const HorizontalScroll = ({ title, data }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          paddingHorizontal: 20,
          color: COLORS.black,
        }}
      >
        {title}
      </Text>

      <View style={{ height: 130, marginTop: 20 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.map((item) => {
            return (
              <Category
                key={item._id}
                imageUri={{ uri: item.img }}
                name={item.category}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default HorizontalScroll;
