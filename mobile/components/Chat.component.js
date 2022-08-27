import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  View,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { auth, db } from '../firebase';

const ChatPage = ({ data }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = useSelector((state) => state.login.userID);
  const type = useSelector((state) => state.login.userType);

  useLayoutEffect(()=>{
    const unSubscribe = db.collection('chats').orderBy('createdAt','desc').onSnapshot(
      snapshot => setMessages(
        snapshot.docs.map(
          doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })
        )
      )
    );
    setLoading(false);
    return unSubscribe;
  },[]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

    db.collection('chats').add({
        _id, createdAt, text, user
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userID,
            name: "React Native",
            avatar: "https://gravatar.com/avatar/50d58429257679a47b1dbf6a6daffc76?s=400&d=robohash&r=x",
          }}
        />
      )}
    </View>
  );
};

export default ChatPage;
