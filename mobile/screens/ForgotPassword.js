import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput.component";
import CustomButton from "../components/CustomButton.component";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import Header from "../components/Header.component";
import HeaderWithBack from "../components/HeaderWithBack.component";
import { icons, COLORS, SIZES, FONTS } from "../constans";

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [randomNumber, setRandomNumber] = useState(0);
  const [userID, setUserID] = useState("");
  const [userData, setUserData] = useState("");
  const navigation = useNavigation();

  const { control, handleSubmit, watch, reset } = useForm();

  const checkEmail = async (data) => {
    try {
      let response = await fetch(
        "http://192.168.8.187:5000/api/v1/user/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.profileEmail,
          }),
        }
      );
      let json = await response.json();
      setUserData(json[0]);
      setUserID(json[0]._id);
      setUsername(json[0].name);
      setUserEmail(data.profileEmail);
      // alert("Email Search Successfully!");
      sendEmail();
    } catch (error) {
      console.log(error);
      alert("Enterd email is not registerd yet!");
      return;
    }
  };

  const sendEmail = async () => {
    let RandomNumber = Math.floor(Math.random() * 1000) + 1;
    setRandomNumber(RandomNumber);
    try {
      let response = await fetch(
        "http://192.168.8.187:5000/api/v1/user/send/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            subject: "Verification Email",
            text: "Verification code is " + randomNumber,
          }),
        }
      );
      let json = await response.json();
      reset();
      if (response.ok) {
        alert("Email is Sent!");
        navigation.navigate("ForgotPasswordEmail", {
          userID: userID,
          randomNumber: randomNumber,
        });
      } else {
        alert("Email is not Sent!");
      }
    } catch (error) {
      console.log(error);
      alert("Email sent unsuccess!");
      return;
    }
  };

  return (
    <View>
      <Header title={"BANTU.LK"} />

      <View style={styles.title}>
        <HeaderWithBack
          text={"Reset Password"}
          iconLeft={"arrow-left"}
          textColor={COLORS.primary}
          iconsColor={COLORS.black}
          isEnabled={"1"}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <CustomInput
              name="profileEmail"
              control={control}
              placeholder="Your email address"
              rules={{
                required: "Email is required",
              }}
            />
            <Text style={styles.requiredFeilds}>Please fill all feilds.</Text>
            <CustomButton text="Submit" onPress={handleSubmit(checkEmail)} />
          </View>
        </ScrollView>
      </View>
    </View>
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
  datePicker: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    height: 50,
    justifyContent: "center",
  },
  datePickerText: {
    color: "grey",
    textAlign: "left",
    // width: 100,
  },
  requiredFeilds: {
    margin: 10,
    fontWeight: "400",
  },
});

export default ForgotPassword;
