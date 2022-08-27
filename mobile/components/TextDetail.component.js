import React from 'react'
import {
  Text,
  StyleSheet,
} from "react-native";

const TextDetail = ({text}) => {
  return (
    <Text style={styles.textStyle}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 20,
    color: "black",
    textAlign: "left",
    marginLeft:20,
    marginTop:10,
  },
});

export default TextDetail