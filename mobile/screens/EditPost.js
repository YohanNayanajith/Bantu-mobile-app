import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const URL1 = "http://192.168.8.187:5000/api/v1/category";

const EditPost = (props) => {
  const userID = useSelector((state) => state.login.userID);
  const type = useSelector((state) => state.login.type);
  const [selected, setSelected] = useState("");
  const [postID, setpostID] = useState("");
  const [data, setData] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState([]);

  const postData = props.route.params;

  const { control, handleSubmit, watch, reset } = useForm();

  useEffect(() => {
    const getCategoryData = async (data) => {
      try {
        await AsyncStorage.setItem('postID',postData._id);
        setpostID(postID);
        let response = await fetch(URL1, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let json = await response.json();
        let dataSet = [];
        json.map((item) => {
          if (item.category || item._id) {
            dataSet.push({ key: item._id, value: item.category });
          }
        });
        setData(dataSet);
      } catch (error) {
        alert(error);
      }
    };
    getCategoryData();
  }, []);

  const URL = `http://192.168.8.187:5000/api/v1/post/${postData._id}`;

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
          postTitle: data.postTitle,
          category: selected,
          postDetail: data.postDetail,
          price: data.price,
        }),
      });
      let json = await response.json();
      reset();
      alert("Profile Updated Successfully!");
    } catch (error) {
      alert(error);
    }
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  return (
    <View>
      <Header title={"BANTU.LK"} />

      <View style={styles.title}>
        <HeaderWithBack
          text={"Edit Post"}
          iconLeft={"arrow-left"}
          // iconRight={"pencil"}
          textColor={COLORS.primary}
          iconsColor={COLORS.black}
          isEnabled={"1"}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <CustomInput
              name="postTitle"
              control={control}
              placeholder="Post Title"
            />

            <View style={styles.box}>
              <SelectList
                data={data}
                setSelected={setSelected}
                boxStyles={{ borderColor: "white", paddingHorizontal: 10 }}
                inputStyles={{ color: "gray" }}
                dropdownStyles={{ borderColor: "white" }}
                dropdownItemStyles={styles.itemStyle}
                dropdownTextStyles={{ color: "gray" }}
                placeholder="Select Category"
                search={false}
              />
            </View>

            <CustomInput
              name="postDetail"
              control={control}
              placeholder="Post Details"
            />

            <CustomInput
              name="price"
              control={control}
              placeholder="Edit Price"
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

export default EditPost;
