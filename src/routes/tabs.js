import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import Drawer from './drawer.js';

import Maps from '../views/maps.js';

const Tab = createBottomTabNavigator();

const homeTabOptions = {
	tabBarColor: '#ffff33',
	tabBarIcon: () => <Icon name="home" size={26} color="#000" />,
};

const mapsTabOptions = {
	tabBarIcon: () => <Icon name="map" size={23} color="#000" />,
};

const scanQRTabOptions = {
	tabBarIcon: () => <Icon name="qr-code-outline" size={23} color="#000" />,
};

export default function Tabs() {
	return (
		<Tab.Navigator activeColor="#FF00FF" tabBarOptions={{ showLabel: false }}>
			<Tab.Screen name="Home" component={Drawer} options={homeTabOptions}></Tab.Screen>
			<Tab.Screen name="About" component={Maps} options={scanQRTabOptions}></Tab.Screen>
			<Tab.Screen name="Map" component={Maps} options={mapsTabOptions}></Tab.Screen>
		</Tab.Navigator>
	);
}
