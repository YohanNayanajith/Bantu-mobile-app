import React from "react";
import HeaderWithBack from "../components/HeaderWithBack.component";
import {
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import ChatPage from "../components/Chat.component";
import Header from "../components/Header.component";
import { icons, COLORS, SIZES, FONTS } from "../constans";

const Chat = (props) => {
  const postData = props.route.params;
  return (
    <SafeAreaView style={styles.title}>
      <Header title={"BANTU.LK"} />
      <HeaderWithBack
        text={"Chat"}
        iconLeft={"arrow-left"}
        // iconRight={"pencil"}
        textColor={COLORS.primary}
        iconsColor={COLORS.black}
        isEnabled={"1"}
      />
      <View style={{ flex: 1 }}>
        <ChatPage data={postData} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    marginBottom: 10,
  },
});

export default Chat;
