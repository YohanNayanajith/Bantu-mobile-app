import React, { useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { icons, images, SIZES, COLORS } from "../constans";
import Header from "../components/Header.component";
import SearchComponent from "../components/Search.component";
import { useSelector } from "react-redux";
const { height, width } = Dimensions.get("window");
import LatestPostPersonal from "../components/LatestPostPersonal";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// DevSettings.reload();

const BelongsPost = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const userID = useSelector((state) => state.login.userID);
  const [refreshing, setRefreshing] = useState(false);

  const URL = `http://192.168.8.187:5000/api/v1/post/find/assign/${userID}`;

  useEffect(() => {
    const getPostData = async (data) => {
      try {
        let response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let json = await response.json();
        setData(json);
        setLoading(true);
        // alert("Post created successfully");
      } catch (error) {
        alert(error);
      }
    };
    getPostData();
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
      <Header title={"BANTU.LK"} />

      <View style={styles.title}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.root}>
          <Text style={styles.title}>Your Post</Text>
        </View>
        <SearchComponent />

        <ScrollView
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ marginTop: 20, marginBottom: 250 }}>
            {!isLoading ? (
              // {isLoading ? (
              <ActivityIndicator />
            ) : (
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 20,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {data.map((item) => {
                  return (
                    <LatestPostPersonal
                      key={item._id}
                      width={width}
                      navigateData={"DoPaymentEdit"}
                      data={item}
                    />
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    marginBottom: 10,
    // paddingTop: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
  box: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    // paddingHorizontal: 10,
    // paddingVertical: 10,
    marginVertical: 5,
  },
  itemStyle: {
    borderBottomColor: "black",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
  },
});

export default BelongsPost;
