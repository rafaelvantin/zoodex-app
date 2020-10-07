import React, { useState, useEffect, useContext } from "react";

import { View, SafeAreaView } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";

import { UserContext } from "../store/userContext";

import BRFormat from "dayjs/locale/pt-br";

export default function Maps() {
  const { getUsername } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Bom dia 73B!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Grupo Coffuel",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{ right: { backgroundColor: "#7CAA4B" } }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#7CAA4B",
            borderRadius: 40,
            width: 35,
            height: 35,
            marginBottom: 5,
            marginRight: 5,
          }}
        >
          <MaterialIcons name="send" color="white" size={20} />
        </View>
      </Send>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <GiftedChat
        style={{ flex: 1 }}
        user={{ name: getUsername }}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        placeholder="Escreva aqui..."
        renderAvatar={null}
        renderUsernameOnMessage={true}
        renderBubble={renderBubble}
        renderSend={renderSend}
        locale="pt-br"
      />
    </SafeAreaView>
  );
}
