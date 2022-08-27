import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import CustomInput from "../components/CustomInput.component";
import CustomButton from "../components/CustomButton.component";
import { useForm } from "react-hook-form";
import SelectList from "react-native-dropdown-select-list";
import Header from "../components/Header.component";
import { useSelector } from "react-redux";
import HeaderWithBack from "../components/HeaderWithBack.component";
import { icons, COLORS, SIZES, FONTS } from "../constans";

const EditProfile = () => {
  const userID = useSelector((state) => state.login.userID);
  const type = useSelector((state) => state.login.type);
  const [selected, setSelected] = useState("");

  const { control, handleSubmit, watch, reset } = useForm();

  const URL = `http://192.168.8.187:5000/api/v1/user/${userID}`;

  const onConfirmButtonPressed = async (data) => {
    if (selected == null) {
      setSelected(type);
    }
    try {
      let response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.profileName,
          selectUser: selected,
          email: data.profileEmail,
          telephone_no: data.profileContact,
        }),
      });
      let json = await response.json();
      reset();
      alert("Profile Updated Successfully!");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View>
      <Header title={"BANTU.LK"} />

      <View style={styles.title}>
        <HeaderWithBack
          text={"Edit Profile"}
          iconLeft={"arrow-left"}
          // iconRight={"pencil"}
          textColor={COLORS.primary}
          iconsColor={COLORS.black}
          isEnabled={"1"}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <CustomInput
              name="profileName"
              control={control}
              placeholder="Your Name"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Title should be at least 3 characters long",
                },
              }}
            />

            <View style={styles.box}>
              <SelectList
                data={[
                  { key: 1, value: "User" },
                  { key: 0, value: "Worker" },
                ]}
                setSelected={setSelected}
                boxStyles={{ borderColor: "white", paddingHorizontal: 10 }}
                inputStyles={{ color: "gray" }}
                dropdownStyles={{ borderColor: "white" }}
                dropdownItemStyles={styles.itemStyle}
                dropdownTextStyles={{ color: "gray" }}
                placeholder="Select your type"
                search={false}
              />
            </View>

            <CustomInput
              name="profileEmail"
              control={control}
              placeholder="Your email address"
            />

            <CustomInput
              name="profileContact"
              control={control}
              placeholder="Your phone number"
            />

            <Text style={styles.requiredFeilds}>
              Please fill only required feilds.
            </Text>
            <CustomButton
              text="Submit"
              onPress={handleSubmit(onConfirmButtonPressed)}
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
    // paddingTop: 10,
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

export default EditProfile;
