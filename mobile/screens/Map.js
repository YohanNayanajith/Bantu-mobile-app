import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { icons, COLORS, SIZES } from "../constans";
import Header from "../components/Header.component";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
// import Geolocation from '@react-native-community/geolocation';
// import GetLocation from 'react-native-get-location'

// Geolocation.setRNConfiguration(config);

const Map = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationText, setLocationText] = useState([]);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const data = props.route.params;
  const [region, setRegion] = useState({
    // 6.903560013958866, 79.95513851247466
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let text = "Waiting..";
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
        setLocationText(text);
        setCurrentLongitude(location.coords.longitude);
        setCurrentLatitude(location.coords.latitude);

        console.log(currentLatitude);
        console.log(currentLongitude);

        setRegion({
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.0421,
        });
        // alert(text);
      }
    })();
  }, []);

  const onRegionChange = (data) => {
    setRegion({ data });
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.backgroundColor }}>
      <Header title={"BANTU.LK"} />
      {/* <Text>Map</Text> */}
      <View style={styles.container}>
        <MapView
          region={{
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={onRegionChange}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: currentLatitude,
              longitude: currentLongitude,
            }}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  map: {
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").height - 100,
  },
});

export default Map;
