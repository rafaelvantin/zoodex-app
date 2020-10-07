import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Tabs from "./tabs.js";
import Ranking from "../views/ranking.js";
import ZooInfo from "../views/zooInfo.js";
import Maps from "../views/maps.js";

import DrawerContent from "../components/drawerContent.js";

const DrawerInstance = createDrawerNavigator();

export default function Drawer() {
  return (
    <DrawerInstance.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Landing"
    >
      <DrawerInstance.Screen name="Home" component={Tabs} />
      <DrawerInstance.Screen name="Ranking" component={Ranking} />
      <DrawerInstance.Screen name="ZooInfo" component={ZooInfo} />
      <DrawerInstance.Screen name="Maps" component={Maps} />
    </DrawerInstance.Navigator>
  );
}
