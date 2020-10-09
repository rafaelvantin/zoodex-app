import "react-native-gesture-handler";
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import InitialSlides from "../views/initialSlides.js";

import { ZooContext } from "../store/zooContext";
import { UserContext } from "../store/userContext";

import Drawer from "./drawer.js";
import EnterZoo from "../views/enterZoo.js";

const Stack = createStackNavigator();

export default function Routes({ navigation }) {
  const { activeZoo } = useContext(ZooContext);

  return (
    <Stack.Navigator headerMode="none" initialRouteName={"InitialSlides"}>
      <Stack.Screen name="InitialSlides" component={InitialSlides} />
      <Stack.Screen name="Home" component={activeZoo ? Drawer : EnterZoo} />
    </Stack.Navigator>
  );
}
