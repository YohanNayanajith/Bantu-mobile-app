import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { icons, COLORS, SIZES, FONTS } from "../constans";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const HeaderWithBack = ({
  text,
  iconLeft,
  iconRight,
  textColor,
  iconsColor,
  isEnabled,
  postId
}) => {
  const [backProfile, setBackProfile] = useState(iconsColor);
  const [editProfile, setEditProfile] = useState(iconsColor);

  const type = useSelector((state) => state.login.userType);

  const navigation = useNavigation();
  const HeaderBackButton = () => {
    setBackProfile(COLORS.primary);
    navigation.goBack();
  };
  const HeaderEditButton = () => {
    if(text == "Post"){
      navigation.navigate("EditPost",postId);
    }else {
      navigation.navigate("EditProfile");
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={HeaderBackButton}>
        <Icon
          name={iconLeft}
          size={25}
          color={backProfile}
          style={{ marginLeft: 20 }}
        />
      </TouchableOpacity>

      <Text style={styles.headerText}>{text}</Text>

      {isEnabled == "1" && type == 1 ? (
        <TouchableOpacity onPress={HeaderEditButton}>
          <Icon
            name={iconRight}
            size={25}
            color={iconsColor}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Icon
            name={iconRight}
            size={25}
            color={"grey"}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    textAlign: "center",
  },
});

export default HeaderWithBack;
