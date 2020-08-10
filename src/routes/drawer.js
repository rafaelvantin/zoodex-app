import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../views/home.js';

const DrawerInstance = createDrawerNavigator();

export default function Drawer() {
	return (
  <DrawerInstance.Navigator initialRouteName="Landing">
    <DrawerInstance.Screen name="Home" component={Home} />
  </DrawerInstance.Navigator>
	);
}
