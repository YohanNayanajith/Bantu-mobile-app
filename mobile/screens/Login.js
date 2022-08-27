import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import CustomInput from "../components/CustomInput.component";
import CustomButton from "../components/CustomButton.component";
import SocialSignInButtons from "../components/SocialSignInButtons.component";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { UserLogin } from '../store/actions';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs()

const URL = "https://localhost:5000/api/v1/auth/login";

const Login = () => {
  const [role, setRole] = useState("");
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSignInPressed = async (data) => {
    try {
      let response = await fetch('http://192.168.8.187:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.username,
          password: data.password,
        })
      });

      let result = await response.json();

      const privateData = {
        "token": result.accessToken.toString(),
        "userID": result._id.toString(),
        "type": result.selectUser.toString()
      }

      dispatch(UserLogin(privateData));

      reset();

      if (privateData.type.toString() == "1") {
        alert("Role - User");
        navigation.navigate("Tabs","1");
      } else if(privateData.type.toString() == "0"){
        alert("Role - Worker");
        navigation.navigate("Tabs","0");
      }else {
        alert("User role incorrect!");
      }
    }catch(err){
      console.log("Something Worng");
      alert("Username or Password is incorrect!");
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgetPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("Register");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.root}>
        <Image
          source={{ uri: "http://www.bantu.lk/images/LOGO3.png" }}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{ required: "Username is required" }}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password should be minimum 3 characters long",
            },
          }}
        />

        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
          //   bgColor="#E7EAF4"
          //   fgColor="#4765A9"
        />

        {Platform.OS === "android" ? <SocialSignInButtons /> : null}

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  root: {
    alignItems: "center",
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,

    // backgroundColor:'red',
  },
  logo: {
    // width: "70%",
    width: 200,
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default Login;
