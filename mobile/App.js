import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import {
  Login,
  ForgetPassword,
  Register,
  AddPost,
  FindCustomers,
  Home,
  Profile,
  Search,
  Payment,
  EditPost,
  BelongsPost,
  Stripe,
  EditProfile,
  Chat,
  ForgotPasswordConfirm,
  ForgotPasswordEmail,
  Map,
} from "./screens";
import Tabs from "./navigation/tabs";
import { Provider } from "react-redux";
import { store } from "./store";
// import { store } from "./redux/store";
// import * as firebase from 'firebase';
import { firebaseConfig } from "./config";
import DoPaymentEdit from "./components/DoPaymentEdit.component";

// firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Log"}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddPost" component={AddPost} />
          <Stack.Screen name="FindCustomers" component={FindCustomers} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="BelongsPost" component={BelongsPost} />
          {/* <Stack.Screen name="Profile" component={Profile1StackScreen} /> */}
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="EditPost" component={EditPost} />
          <Stack.Screen name="DoPaymentEdit" component={DoPaymentEdit} />
          <Stack.Screen name="Stripe" component={Stripe} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="ForgotPasswordConfirm" component={ForgotPasswordConfirm} />
          <Stack.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmail} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
