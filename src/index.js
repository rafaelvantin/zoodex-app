import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/index.js';

import './config/StatusBar.js';

export default function App() {
	return (
		<NavigationContainer>
			<Routes />
		</NavigationContainer>
	);
}
