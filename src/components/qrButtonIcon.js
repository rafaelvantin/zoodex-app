import React from 'react';

import { View, TouchableHighlight, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function QrButtonIcon() {
	const navigation = useNavigation();

	return (
		<View style={{ position: 'absolute', alignItems: 'center' }}>
			<TouchableHighlight style={styles.button} onPress={() => navigation.navigate('QR')}>
				<Icon name="qr-code-outline" size={27} color="#fff" />
			</TouchableHighlight>
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
		top: -40,
		elevation: 2,
		borderWidth: 2,
		borderColor: '#fff',
	},
});
