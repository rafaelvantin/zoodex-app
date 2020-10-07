import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeStackNavigator from "./homeStackNavigator.js";
import Chat from "../views/chat.js";
import ScanQR from "../views/scanQr.js";

import QrButtonIcon from "../components/qrButtonIcon.js";

const Tab = createBottomTabNavigator();

const homeTabOptions = {
  tabBarLabel: "Início",
  tabBarIcon: ({ color }) => (
    <Ionicons name="md-home" size={28} color={color} />
  ),
};

const mapsTabOptions = {
  tabBarLabel: "Chat",
  tabBarIcon: ({ color }) => (
    <Ionicons name="md-chatboxes" size={25} color={color} />
  ),
};

const scanQRTabOptions = {
  tabBarLabel: "",
  tabBarIcon: () => <QrButtonIcon />,
};

const tabBarOptions = {
  activeTintColor: "#1E1E1E",
  showIcon: true,
  tabStyle: {
    backgroundColor: "#fcfcfc",
  },
};

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      inactiveColor="#CCCDEE"
      tabBarOptions={tabBarOptions}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={homeTabOptions}
      />
      <Tab.Screen name="QR" component={ScanQR} options={scanQRTabOptions} />
      <Tab.Screen name="Chat" component={Chat} options={mapsTabOptions} />
    </Tab.Navigator>
  );
}
