import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput.component";
import CustomButton from "../components/CustomButton.component";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import Header from "../components/Header.component";
import HeaderWithBack from "../components/HeaderWithBack.component";
import { icons, COLORS, SIZES, FONTS } from "../constans";

const ForgotPasswordEmail = (props) => {
  const navigation = useNavigation();
  const dataNavigation = props.route.params;
  console.log(dataNavigation);

  const { control, handleSubmit, watch, reset } = useForm();

  const checkVerificationCode = (data) => {
    console.log("Verification Code: " + data.verificationCode);
    console.log("Random Number: " + dataNavigation.randomNumber);
    if (
      data.verificationCode.toString() ===
      dataNavigation.randomNumber.toString()
    ) {
      navigation.navigate("ForgotPasswordConfirm", {
        userID: dataNavigation.userID,
      });
    } else {
      alert("Verification code is invalid!");
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
              name="verificationCode"
              control={control}
              placeholder="Your email verification code"
              rules={{
                required: "Verification code is required",
              }}
            />

            <Text style={styles.requiredFeilds}>Please fill all feilds.</Text>
            <CustomButton
              text="Submit"
              onPress={handleSubmit(checkVerificationCode)}
            />
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

export default ForgotPasswordEmail;
