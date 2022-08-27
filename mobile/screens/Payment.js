import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header.component";
import HeaderWithBack from "../components/HeaderWithBack.component";
import { icons, COLORS, SIZES } from "../constans";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Payment = (props) => {
  const [data, setData] = useState([]);
  const [postID, setpostID] = useState();
  const type = useSelector((state) => state.login.userType);
  const userID = useSelector((state) => state.login.userID);
  const navigation = useNavigation();
  const postData = props.route.params;

  useEffect(() => {
    setpostID(postData._id);
  }, []);

  const updateUserAssign = async () => {
    Alert.alert(
      "Are you sure?",
      "You have to complete this job before the expired data.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: sendDataUpdate,
        },
      ]
    );
  };

  const URL = `http://192.168.8.187:5000/api/v1/post/${postID}`;

  const sendDataUpdate = async () => {
    try {
      let response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_assign: true,
          assigned_userID: userID,
        }),
      });
      let json = await response.json();
      setData(json);
      alert("Assign Successfully!");
    } catch (error) {
      alert(error);
    }
  };

  const updatePrice = () => {
    alert("You can't pay for this!");
  };

  const startChat = () => {
    navigation.navigate("Chat",postData);
  };
  const cantStartChat = () => {
    alert("Doesn't have any assigned person.");
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
        isEnabled="0"
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
                Assign to me
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

export default Payment;
