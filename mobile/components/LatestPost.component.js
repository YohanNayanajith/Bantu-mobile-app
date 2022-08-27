import React from "react";
import { View, Text, StyleSheet, Dimensions  } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, icons } from "../constans";
import { useNavigation } from "@react-navigation/native";
import PostIcons from "./PostIcons.component";
var width = Dimensions.get('window').width;

const LatestPost = ({data,width,navigateData}) => {
  const navigation = useNavigation();

  return (
    <View>
      {!data.is_assign && data.isApproved ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {navigation.navigate(navigateData, data); }}
          >
            <View style={styles.container1}>
              <PostIcons
                source={icons.new_post}
                style={{ width: 32, height: 32, marginTop: 4 }}
              />
              <View style={styles.container2}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", marginRight: 20 }}
                >
                  {data.postTitle}
                </Text>
                <Text style={{ fontSize: 14 }}>
                  {data.date} {data.time}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 16, paddingLeft: 20, padding: 10 }}>
              {data.postDetail}
            </Text>
            <View style={styles.container4}>
              <View style={styles.container3}>
                <PostIcons
                  source={icons.heart}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 10,
                    marginRight: 5,
                  }}
                />
                <PostIcons
                  source={icons.comments}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 10,
                    marginRight: 5,
                  }}
                />
                <PostIcons
                  source={icons.add}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 10,
                    marginRight: 5,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: width-40,
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: "#dddddd",
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 5,
  },
  container1: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20,
    padding: 10,
  },
  container2: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  container3: {
    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: 16,
    paddingLeft: 20,
    padding: 10,
  },
  container4: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container5: {
    justifyContent: "flex-end",
    margin: 15,
    marginRight:5,
  },
  container6: {
    justifyContent: "flex-end",
    margin: 15,
    marginRight: 20,
  }
});


export default LatestPost;
