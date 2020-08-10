import React from 'react';

import { View, TouchableHighlight, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function QrButtonIcon() {
	return (
		<View style={{ position: 'absolute', alignItems: 'center' }}>
			<View style={styles.button}>
				<TouchableHighlight>
					<Icon name="qr-code-outline" size={27} color="#fff" />
				</TouchableHighlight>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#27C553',
		alignItems: 'center',
		justifyContent: 'center',
		width: 62,
		height: 62,
		borderRadius: 36,
		position: 'absolute',
		top: -50,
		elevation: 2,
		borderWidth: 2,
		borderColor: '#fff',
	},
});
