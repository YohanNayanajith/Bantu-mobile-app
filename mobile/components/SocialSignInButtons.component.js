import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import CustomButton from "./CustomButton.component";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useSelector, useDispatch } from "react-redux";
import { UserLogin } from "../store/actions";

WebBrowser.maybeCompleteAuthSession();

const URL = "http://192.168.8.187:5000/api/v1/auth/register";

const SocialSignInButtons = () => {
  const [id, setId] = useState();
  const [userType, setUserType] = useState();
  const [privateData, setPrivateData] = useState([]);
  const navigation = useNavigation();

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "676452566020-jl1og9a2uu69v5uciu69hc2m1oq0quni.apps.googleusercontent.com",
    iosClientId:
      "676452566020-0sslhmkbndol4483u4lkb4ca3sj5pvv6.apps.googleusercontent.com",
    androidClientId:
      "676452566020-jl1og9a2uu69v5uciu69hc2m1oq0quni.apps.googleusercontent.com",
    webClientId:
      "676452566020-vksbbusb1fofklcnek58u2trk4kfuv80.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setAccessToken(response.authentication.accessToken);
      getUserData();
    }
  }, [response]);

  const onSignInFacebook = () => {
    console.warn("onSignInFacebook");
  };

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUser(data);
    });
    if (!user) {
      alert("Google response is not clear.Try again!");
    } else {
      onSignInPressed(user);
    }
  };

  const onSignInPressed = async (data) => {
    if (!data.email) {
      alert("Email not found!");
      return null;
    }
    const urlData = "http://192.168.8.187:5000/api/v1/user/email";
    try {
      let response = await fetch(urlData, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });
      let json = await response.json();
      setCurrentUser(json);
    } catch (error) {
      console.log("Can't find a user");
    }
    console.log(currentUser);

    if (!currentUser) {
      //register
      onRegistered(data);
    } else {
      setId(currentUser._id);
      setUserType(currentUser.selectUser);
      userNevigate();
    }
  };

  const userNevigate = () => {
    let privateData = {
      token: accessToken,
      userID: id,
      type: userType,
    };
    dispatch(UserLogin(privateData));
    const role = privateData.type.toString();

    if (role == "1") {
      alert("Role - User");
      navigation.navigate("Tabs","1");
    } else {
      alert("Role - Worker");
      navigation.navigate("Tabs","0");
    }
  };

  //register new user
  const onRegistered = async (data) => {
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          img_url: data.picture,
          email: data.email,
          password: "google",
          confirm_password: "google",
          selectUser: 1,
        }),
      });
      let json = await response.json();
      setId(json._id.toString());
      setUserType(json.selectUser.toString());

      let privateData = {
        "token": accessToken,
        "userID": json._id.toString(),
        "type": json.selectUser.toString(),
      };

      dispatch(UserLogin(privateData));
      const role = privateData.type;

      if (role == "1") {
        alert("Role - User");
        navigation.navigate("Tabs");
      } else {
        alert("Role - Worker");
        navigation.navigate("Tabs");
      }
    } catch (error) {
      alert("Registerd not completed, Contact admin!");
    }
  };

  return (
    <>
      <Pressable
        onPress={() => {
          promptAsync();
        }}
        disabled={!request}
        style={[
          { backgroundColor: "#FAE9EA", color: "#DD4D44" },
          styles.container,
        ]}
      >
        <Text style={[styles.text, styles.text_PRIMARY, { color: "#DD4D44" }]}>
          Sign In with Google
        </Text>
      </Pressable>

      {/* {googleSubmitting && <ActivityIndicator />} */}

      <CustomButton
        text="Sign In with Facebook"
        onPress={onSignInFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,

    backgroundColor: "#FAE9EA",
    color: "#DD4D44",
  },

  text: {
    fontWeight: "bold",
    color: "#DD4D44",
  },
});

export default SocialSignInButtons;
