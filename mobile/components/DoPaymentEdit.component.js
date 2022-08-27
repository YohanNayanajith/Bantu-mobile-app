import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header.component";
import HeaderWithBack from "../components/HeaderWithBack.component";
import { icons, COLORS, SIZES } from "../constans";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Rating, AirbnbRating } from "react-native-ratings";

const DoPaymentEdit = (props) => {
  const type = useSelector((state) => state.login.userType);
  const [rate,setRate] = useState(0);
  const navigation = useNavigation();
  const postData = props.route.params;

  const URL = `http://192.168.8.187:5000/api/v1/post/${postData._id}`;
  const URL1 = `http://192.168.8.187:5000/api/v1/post/find/data/${postData._id}`;
  useEffect(()=>{
    const checkRating = async () => {
      try {
        let response = await fetch(URL1, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        let json = await response.json();
        setRate(json.rate);
      } catch (error) {
        console.log("Rate Unsuccess!");
      }
    };
    checkRating();
  },[]);

  const updatePrice = async () => {
    if (postData.payment_success) {
      alert("Payment is already done!");
    } else if (!postData.is_assign) {
      alert("Job is not assign");
    } else {
      alert("Do your payment");
      navigation.navigate("Stripe", postData);
    }
  };

  const updateUserAssign = async () => {
    Alert.alert("Did you complete your job?", "Congratulations!!!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: sendDataUpdate,
      },
    ]);
  };

  

  const sendDataUpdate = async () => {
    try {
      let response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_complete: true,
        }),
      });
      let json = await response.json();
      alert("Successfully Completed!");
    } catch (error) {
      alert("Completed Unsuccess!");
    }
  };

  const startChat = () => {
    navigation.navigate("Chat", postData);
  };
  const cantStartChat = () => {
    alert("Doesn't have any assigned person.");
  };

  const ratingCompleted = async (rating) => {
    // console.log("Rating is: " + rating);
    try {
      let response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rate: rating,
        }),
      });
      let json = await response.json();
      console.log("Rating Completed!");
    } catch (error) {
      console.log("Rating Unsuccess!");
    }
  };

  const openDirections = () => {
    navigation.navigate("Map",postData);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
      <Header title={"BANTU.LK"} />
      <HeaderWithBack
        text={"Post"}
        iconLeft={"arrow-left"}
        iconRight={"pencil"}
        textColor={COLORS.primary}
        iconsColor={COLORS.black}
        isEnabled="1"
        postId={postData}
      />

      <View style={styles.item}>
        <View style={styles.title}>
          <Text
            style={{ fontSize: SIZES.h2, lineHeight: 30, fontWeight: "bold" }}
          >
            {postData.postTitle}
          </Text>
          <Text style={{ fontSize: SIZES.h4, lineHeight: 26, paddingTop: 10 }}>
            {postData.postDetail}
          </Text>
        </View>
        <View style={styles.container}>
          <Icon name="calendar" color={COLORS.primary} size={24} />
          <Text style={{ fontSize: 16, color: COLORS.grey, marginLeft: 5 }}>
            {postData.date}
          </Text>
        </View>
        <View style={styles.container}>
          <Icon name="timer" color={COLORS.primary} size={24} />
          <Text style={{ fontSize: 16, color: COLORS.grey, marginLeft: 5 }}>
            {postData.time}
          </Text>
        </View>
        <View style={styles.container}>
          <Icon name="map-marker" color={COLORS.primary} size={24} />
          <Text style={{ fontSize: 16, color: COLORS.grey, marginLeft: 5 }}>
            {postData.address}
          </Text>
        </View>
        <View style={styles.container}>
          <Icon name="card" color={COLORS.primary} size={24} />
          <Text style={{ fontSize: 16, color: COLORS.grey, marginLeft: 5 }}>
            {postData.price}$
          </Text>
        </View>
      </View>

      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View style={styles.footer}>
          <View style={styles.iconCon}>
            <Icon name="map-marker" size={22} color={COLORS.white} onPress={openDirections} />
          </View>

          {type == "0" ? (
            <View style={styles.btn}>
              <Text
                style={{ color: COLORS.white, fontWeight: "bold" }}
                onPress={updateUserAssign}
              >
                Complete Job
              </Text>
            </View>
          ) : (
            <View style={styles.btn}>
              <Text
                style={{ color: COLORS.white, fontWeight: "bold" }}
                onPress={updatePrice}
              >
                Do Payment
              </Text>
            </View>
          )}

          {postData.is_assign ? (
            <View style={styles.iconCon}>
              <Icon
                name="plus"
                size={22}
                color={COLORS.white}
                onPress={startChat}
              />
            </View>
          ) : (
            <View style={styles.iconCon}>
              <Icon
                name="plus"
                size={22}
                color={COLORS.white}
                onPress={cantStartChat}
              />
            </View>
          )}
        </View>
        {postData.is_complete && type == "1" ? (
          <View style={{ marginBottom: 200 }}>
            <Text
              style={{
                color: COLORS.black,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: SIZES.h4,
                paddingTop: 10,
              }}
            >
              Rate the Worker
            </Text>
            <AirbnbRating
              count={5}
              reviews={["Terrible", "Bad", "Good", "Very Good", "Amazing"]}
              defaultRating={rate}
              size={40}
              ratingColor="#3498db"
              ratingBackgroundColor="#c8c7c8"
              onFinishRating={ratingCompleted}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    // flexDirection:'row',
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    alignItems: "center",
    marginBottom: 10,
  },
  container: {
    marginTop: 5,
    flexDirection: "row",
    marginHorizontal: 20,
  },
  footer: {
    height: 100,
    backgroundColor: COLORS.light,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 10,
    // paddingHorizontal: 20,
  },
  iconCon: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 15,
  },
  btn: {
    backgroundColor: COLORS.primary,
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default DoPaymentEdit;
