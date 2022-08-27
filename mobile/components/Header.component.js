import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");
import { icons, SIZES, COLORS } from "../constans";
import { Logout } from '../store/actions';
import { useDispatch } from 'react-redux';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import storage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

const Header = (props) => {
  const [logout, setlogout] = useState(COLORS.black);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const getPermission = async () => {
      if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Enable push notifications to use the app!');
            await storage.setItem('expopushtoken', "");
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          await storage.setItem('expopushtoken', token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
    }

    getPermission();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {});

    afterLoginNotification();
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
    
  }, []);

  const signOut = () => {
    setlogout(COLORS.primary);
    dispatch(Logout());
    navigation.navigate("Login");
  };

  const pressNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Check New Post",
        body: "Check newly addedd post...",
        data: { data: "data goes here" }
      },
      trigger: {
        seconds: 2
      }
    });
  };

  const afterLoginNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Login",
        body: "Successfully login to the system",
        data: { data: "data goes here" }
      },
      trigger: {
        seconds: 2
      }
    });
  };

  return (
    <View
      style={{
        height: 50,
        marginTop: Platform.OS == "android" ? 30 : null,
        backgroundColor: COLORS.white,
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: "row", height: 50 }}>
          <TouchableOpacity
            style={{
              width: 50,
              paddingLeft: SIZES.padding * 2,
              justifyContent: "center",
            }}
            onPress={pressNotification}
          >
            <Image
              source={icons.bell}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
            {/* <Icon name={"bell"} size={30} backgroundColor={notificationIcon} /> */}
          </TouchableOpacity>

          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                width: "70%",
                height: "100%",
                backgroundColor: COLORS.lightGray3,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: SIZES.radius,
              }}
            >
              <Text style={{ fontSize: SIZES.h3, lineHeight: 22 }}>
                {props.title}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: 50,
              paddingRight: SIZES.padding * 2,
              justifyContent: "center",
            }}
            onPress={signOut}
          >
            <Image
              source={icons.logout}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.lightGray4,
    // backgroundColor: "black",
  },
});

export default Header;
