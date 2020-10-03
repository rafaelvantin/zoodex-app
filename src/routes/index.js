import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import IdentifyZoo from "../views/identifyZoo.js";

import Drawer from "./drawer.js";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen name="IdentifyZoo" component={IdentifyZoo} />
      <Stack.Screen name="Home" component={Drawer} />
    </Stack.Navigator>
  );
}
