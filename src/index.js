import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes/tabs.js';

import './config/StatusBar.js';

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Routes />
			</NavigationContainer>
		</PaperProvider>
	);
}
