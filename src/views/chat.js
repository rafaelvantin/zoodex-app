import React, { useState, useEffect, useContext } from "react";

import { SafeAreaView, View } from "react-native";

import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";

import { MaterialIcons } from "@expo/vector-icons";

import { UserContext } from "../store/userContext";

import io from "socket.io-client";

import BRFormat from "dayjs/locale/pt-br";

export default function Chat() {
  const { getUsername, getUserID, activeZoo } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const socket = io("http://192.168.0.2:3000");

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

  useEffect(() => {
    socket.emit("join", { user: getUsername, room: activeZoo });

    socket.on("message", (newMessages) => {
      newMessages.map((item) => {
        setMessages((previous) => GiftedChat.append(previous, item));
      });
    });
  }, []);

  const onSend = (message) => socket.emit("message", message);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <GiftedChat
        user={{ name: getUsername, id: getUserID }}
        onSend={(messages) => onSend(messages)}
        messages={messages}
        style={{ flex: 1 }}
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
