import React, { useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CustomInput from "../components/CustomInput.component";
import CustomButton from "../components/CustomButton.component";
// import { useNavigation } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
// import Cookies from "js-cookie";
// import { icons, images, SIZES, COLORS } from "../constants";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// const { height } = Dimensions.get("window");
import SelectList from "react-native-dropdown-select-list";
import Header from "../components/Header.component";
import { useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import categories from "../constans/categories";
import { ArrowLeft } from "@material-ui/icons";

const URL1 = "http://192.168.8.187:5000/api/v1/category";
const URL = "http://192.168.8.187:5000/api/v1/post";

const AddPost = () => {
  const [isLoading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState([]);
  const userID = useSelector((state) => state.login.userID);
  //   const [dropDownData, setDropDownData] = useState([]);

  const { control, handleSubmit, watch, reset } = useForm();
  const navigation = useNavigation();

  // const UserID = Cookies.get('UserID');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(year + "/" + month + "/" + date);
    setCurrentTime(hours + ":" + min + ":" + sec);

    const getCategoryData = async (data) => {
      try {
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

  const onConfirmButtonPressed = async (data) => {
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postTitle: data.postTitle,
          category: selected,
          postDetail: data.postDetail,
          userID: userID,
          noOfLikes: 0,
          date: currentDate,
          time: currentTime,
          price: data.price,
          expire_date: date,
          address: data.address,
        }),
      });
      let json = await response.json();
      alert("Post created successfully");
      reset();
    } catch (error) {
      alert(error);
    }
    navigation.navigate("AddPost");
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <Text style={styles.title}>Add New Post</Text>

            <CustomInput
              name="postTitle"
              control={control}
              placeholder="Title"
              rules={{
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title should be at least 3 characters long",
                },
              }}
            />

            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <View style={styles.box}>
                <SelectList
                  data={data}
                  setSelected={setSelected}
                  // rowStyle={styles.box}
                  boxStyles={{ borderColor: "white", paddingHorizontal: 10 }}
                  inputStyles={{ color: "gray" }}
                  dropdownStyles={{ borderColor: "white" }}
                  dropdownItemStyles={styles.itemStyle}
                  dropdownTextStyles={{ color: "gray" }}
                  placeholder="Select your category"
                  // maxWidth={"100%"}
                  search={false}
                />
              </View>
            )}

            <CustomInput
              name="postDetail"
              control={control}
              placeholder="Description"
              rules={{
                required: "Description is required",
              }}
            />

            <CustomInput
              name="price"
              control={control}
              placeholder="Price"
              rules={{
                required: "Price is required",
                min: 0,
              }}
            />
            <CustomInput
              name="address"
              control={control}
              placeholder="Job address"
              rules={{
                required: "Address is required",
              }}
            />

            {/* date ekak danna */}
            <View style={styles.datePicker}>
              <Text
                placeholder="Set the expire date"
                style={styles.datePickerText}
                onPress={showDatePicker}
              >
                {/* {date} */}
                Select expire date
              </Text>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <CustomButton
              text="Confirm"
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

    // paddingHorizontal: 10,
    // paddingVertical: 10,
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
});

export default AddPost;
