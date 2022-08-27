import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../components/CustomInput.component";
import CustomButton from "../components/CustomButton.component";
import SocialSignInButtons from "../components/SocialSignInButtons.component";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import SelectList from "react-native-dropdown-select-list";

const URL = "http://192.168.8.187:5000/api/v1/auth/register";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Register = () => {
  const { control, handleSubmit, watch, reset } = useForm();
  const [selected, setSelected] = useState("");
  const pwd = watch("password");
  const navigation = useNavigation();

  const dropDownData = [
    { key: "1", value: "user" },
    { key: "2", value: "worker" },
  ];

  const onRegisterPressed = async (data) => {
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.username,
          telephone_no: data.telephone_no,
          //   address: data.address,
          email: data.email,
          password: data.password,
          confirm_password: data.password_repeat,
          selectUser:selected,
        }),
      });
      let json = await response.json();
      reset();
    } catch (error) {
      alert(error);
    }
    navigation.navigate("Login");
  };

  const onSignInPress = (data) => {
    navigation.navigate("Login");
  };

  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };

  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Username should be max 24 characters long",
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
        />
        <CustomInput
          name="telephone_no"
          control={control}
          placeholder="Conatact No"
          rules={{
            required: "Phone number is required",
            minLength: {
              value: 9,
              message: "Telephone No should be at least 9 numbers long",
            },
            maxLength: {
              value: 12,
              message: "Telephone No should be max 12 characters long",
            },
          }}
        />
        <View style={styles.box}>
          <SelectList
            data={dropDownData}
            setSelected={setSelected}
            // rowStyle={styles.box}
            boxStyles={{ borderColor: "white", paddingHorizontal: 10 }}
            inputStyles={{ color: "gray" }}
            dropdownStyles={{ borderColor: "white" }}
            dropdownItemStyles={styles.itemStyle}
            dropdownTextStyles={{ color: "gray" }}
            placeholder="Select User Type"
            search={false}
          />
        </View>

        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
          }}
        />
        <CustomInput
          name="password_repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: (value) => value === pwd || "Password do not match",
          }}
        />

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
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
    margin: 10,
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
});

export default Register;
