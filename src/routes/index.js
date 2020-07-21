import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../views/landing.js';
import IdentifyZoo from '../views/identifyZoo.js';

import Tabs from './tabs.js';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen name="Landing" component={Landing} />
			<Stack.Screen name="IdentifyZoo" component={IdentifyZoo} />
			<Stack.Screen name="Home" component={Tabs} />
		</Stack.Navigator>
	);
}
