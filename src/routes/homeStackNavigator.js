import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../views/home.js';
import Animal from '../views/animal.js';
import AnimalInfo from '../views/animalInfo.js';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
	return (
		<Stack.Navigator headerMode="none" initialRouteName="Animal">
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Animal" component={Animal} />
			<Stack.Screen name="AnimalInfo" component={AnimalInfo} />
		</Stack.Navigator>
	);
}
