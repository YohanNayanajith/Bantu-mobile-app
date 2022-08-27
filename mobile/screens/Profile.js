import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
// import Cookies from "js-cookie";
// import axios from "axios";
import Header from "../components/Header.component";
import Placeholder from "../components/Placeholder.component";
import { icons, COLORS, SIZES, FONTS } from "../constans";
import TextDetail from "../components/TextDetail.component";
import HeaderWithBack from "../components/HeaderWithBack.component";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Profile = () => {
  // const [DATA, setDATA] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [DATA, setDATA] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [userType, setUserType] = useState("Worker");
  const userID = useSelector((state) => state.login.userID);
  const type = useSelector((state) => state.login.userType);
  // console.log(userID);
  // console.log("User Type "+type);
  const authToken = useSelector((state) => state.login.authToken);
  const URL = "http://192.168.8.187:5000/api/v1/user/find";
  // console.log(URL);

  let token = "Bearer " + authToken;

  useEffect(() => {
    fetch("http://192.168.8.187:5000/api/v1/user/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: userID,
      }),
    })
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        // console.log(json);
        setData(json);
        if (type === 0) {
          setUserType("Worker");
        } else {
          setUserType("User");
        }
        createDataSet(json);
        setImageUrl(json.img_url);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  }, []);

  // Also get call asynchronous function
  async function getMoviesAsync() {
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: userID,
        }),
      });
      let json = await response.json();
      setData(json);
      setLoading(false);
      createDataSet(json);
      if (data.selectUser === 0) {
        setUserType("Worker");
      } else {
        setUserType("User");
      }
      setImageUrl(json.img_url);
    } catch (error) {
      alert(error);
    }
  }

  // let userType;

  const createDataSet = (data) => {
    let DATA = [
      {
        id: "1",
        title: "Name",
        value: data.name,
      },
      {
        id: "2",
        title: "Email Address",
        value: data.email,
      },
      {
        id: "3",
        title: "Phone Number",
        value: data.telephone_no,
      },
      {
        id: "4",
        title: "User Type",
        value: userType,
      },
    ];
    setDATA(DATA);
  };

  return (
    <SafeAreaView style={[{ backgroundColor: COLORS.backgroundColor }]}>
      <View style={styles.mainContainer}>
        <Header title={"BANTU.LK"} />

        <HeaderWithBack
          text={"Profile"}
          iconLeft={"arrow-left"}
          iconRight={"pencil"}
          textColor={COLORS.primary}
          iconsColor={COLORS.black}
          isEnabled= {"1"}
        />

        <View style={styles.image}>
          {imageUrl == "none" ? (
            <Image
              source={{
                uri: "https://gravatar.com/avatar/50d58429257679a47b1dbf6a6daffc76?s=400&d=robohash&r=x",
              }}
              resizeMode="contain"
              style={{
                width: 130,
                height: 130,
                borderColor: "red",
                borderRadius: 100,
                marginBottom: 30,
                marginTop: 30,
                backgroundColor: "white",
              }}
            />
          ) : (
            <Image
              source={{
                uri: imageUrl,
              }}
              resizeMode="contain"
              style={{
                width: 130,
                height: 130,
                borderColor: "red",
                borderRadius: 100,
                marginBottom: 30,
                marginTop: 30,
                backgroundColor: "white",
              }}
            />
          )}
        </View>

        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={DATA}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View>
                  <TextDetail text={item.title} />
                  <Placeholder text={item.value} />
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
  },
});

export default Profile;
