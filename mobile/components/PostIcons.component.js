import React from "react";
import { Image } from "react-native";

const PostIcons = ({source,style}) => {
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={style}
    />
  );
};

export default PostIcons;
