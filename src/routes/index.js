import "react-native-gesture-handler";
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import InitialSlides from "../views/initialSlides.js";

import { UserContext } from "../store/userContext";

import Drawer from "./drawer.js";

const Stack = createStackNavigator();

export default function Routes() {
  const { getUsername } = useContext(UserContext);
  console.log(getUsername);

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={getUsername != "" ? "Home" : "InitialSlides"}
      // initialRouteName={"Home"}
    >
      <Stack.Screen name="InitialSlides" component={InitialSlides} />
      <Stack.Screen name="Home" component={Drawer} />
    </Stack.Navigator>
  );
}
