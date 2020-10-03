import React from 'react';

import { View, Text, TouchableHighlight, TextInput, StyleSheet } from 'react-native';

export default function IdentifyZoo({ navigation }) {
	function navToHome() {
		navigation.navigate('Home');
	}

	return (
  <View style={styles.container}>
    <Text style={styles.text}>Digite o ID do Zoologico</Text>
    <TextInput style={styles.input} maxLength={20} underlineColorAndroid="black" />
    <TouchableHighlight style={styles.button}>
      <Text style={styles.buttonText} onPress={navToHome}>
        Next
      </Text>
    </TouchableHighlight>
  </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF',
	},
	text: {
		fontSize: 20,
		marginBottom: 10,
	},
	input: {
		width: 240,
		marginBottom: 30,
	},
	button: {
		alignContent: 'center',
	},
	buttonText: {
		fontSize: 15,
		fontFamily: 'Roboto',
		fontWeight: '900',
		textAlign: 'center',
		color: '#fff',
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 60,
		paddingLeft: 60,
		borderRadius: 16,
		backgroundColor: '#2DCC3F',
	},
});
