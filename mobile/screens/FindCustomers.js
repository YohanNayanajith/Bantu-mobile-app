import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header.component";
import SearchComponent from "../components/Search.component";
import LatestPost from "../components/LatestPost.component";
const { height, width } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/core";
import { icons, COLORS, SIZES } from "../constans";
import { useSelector } from "react-redux";

const URL = "http://192.168.8.187:5000/api/v1/post";

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const FindCustomers = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const authToken = useSelector((state) => state.login.authToken);
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  let token = "Bearer " + authToken;

  useEffect(() => {
    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  }, []);

  // Also get call asynchronous function
  async function getPostAsync() {
    try {
      let response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      let json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
      <Header title={"BANTU.LK"} />

      <View style={{ marginTop: 20 }}>
        <SearchComponent />
      </View>

      <ScrollView scrollEventThrottle={16} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              fontSize: SIZES.mobileHeading,
              fontWeight: "700",
              paddingHorizontal: 20,
            }}
          >
            POSTED JOBS
          </Text>
          {isLoading && data.isApproved === 0 ? (
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
                // alignItems:"center"
              }}
            >
              {data.map((item) => {
                return (
                  <LatestPost
                    key={item._id}
                    width={width}
                    data={item}
                    navigateData={"Payment"}
                  />
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FindCustomers;
