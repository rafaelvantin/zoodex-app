import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Tabs from './tabs.js';
import Ranking from '../views/ranking.js';

import DrawerContent from '../components/drawerContent.js';

const DrawerInstance = createDrawerNavigator();

export default function Drawer() {
	return (
		<DrawerInstance.Navigator
			drawerContent={(props) => <DrawerContent {...props} />}
			initialRouteName="Landing"
		>
			<DrawerInstance.Screen name="Home" component={Tabs} />
			<DrawerInstance.Screen name="Ranking" component={Ranking} />
		</DrawerInstance.Navigator>
	);
}
