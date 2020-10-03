import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeStackNavigator from "./homeStackNavigator.js";
import Maps from "../views/maps.js";
import ScanQR from "../views/scanQr.js";

import QrButtonIcon from "../components/qrButtonIcon.js";

const Tab = createBottomTabNavigator();

const homeTabOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ color }) => (
    <Ionicons name="md-home" size={28} color={color} />
  ),
};

const mapsTabOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ color }) => <Ionicons name="md-map" size={25} color={color} />,
};

const scanQRTabOptions = {
  tabBarLabel: "Scan QR",
  tabBarIcon: () => <QrButtonIcon />,
};

const tabBarOptions = {
  activeTintColor: "#1E1E1E",
  showLabel: false,
  showIcon: true,
  tabStyle: {
    backgroundColor: "#EFEFEF",
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
      <Tab.Screen name="Map" component={Maps} options={mapsTabOptions} />
    </Tab.Navigator>
  );
}
