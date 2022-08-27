import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import filter from "lodash.filter";
import React, { useEffect, useState } from "react";
import Header from "../components/Header.component";
import SearchComponent from "../components/Search.component";
import HorizontalScroll from "../components/HorizontalScroll.component";
import ImageView from "../components/ImageView.component";
import LatestPost from "../components/LatestPost.component";
const { height, width } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/core";
import { icons, COLORS, SIZES } from "../constans";
import { useSelector } from "react-redux";

const URL = "http://192.168.8.187:5000/api/v1/category";
const URL1 = "http://192.168.8.187:5000/api/v1/post";

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  // const [count, setCount] = useState(0);
  const authToken = useSelector((state) => state.login.authToken);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryData, setCategoryData] = useState([]);

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
        setCategoryData(json);

        fetch(URL1, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
          .then((response) => response.json()) // get response, convert to json
          .then((json) => {
            setData(json.slice(0, 5));
          })
          .catch((error) => alert(error)) // display errors
          .finally(() => setLoading(false)); // change loading state
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setCategoryLoading(false)); // change loading state
  }, [query,refreshing]);

  // Also get call asynchronous function
  async function getMoviesAsync() {
    try {
      let response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      let json = await response.json();
      setCategoryData(json);
      setCategoryLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  // Also get call asynchronous function
  async function getPostAsync() {
    try {
      let response = await fetch(URL1, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      let json = await response.json();
      setData(json.slice(0, 5));
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(data, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

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

      <ScrollView scrollEventThrottle={16} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ flex: 1, paddingTop: 20 }}>
          {categoryLoading ? (
            <ActivityIndicator />
          ) : (
            <HorizontalScroll title={"CATEGORY"} data={categoryData} />
          )}
          <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
            <ImageView />
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              fontSize: SIZES.mobileHeading,
              fontWeight: "700",
              paddingHorizontal: 20,
            }}
          >
            LATEST POSTS
          </Text>
          {isLoading && data.isApproved == 0 ? (
            // {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems:"center"
              }}
            >
              {data.map((item) => {
                // setCount(count+1)
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

export default Home;
