import React from 'react';

import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.firstRow}>
				<Icon name="menu-outline" size={35} onPress={() => navigation.openDrawer()}></Icon>
				<Icon name="star-outline" color="#e5c100" size={32}></Icon>
				<Icon name="cog" size={33}></Icon>
			</View>
			<View style={styles.secundRow}>
				<View style={styles.textFieldContainer}>
					{/* onChangeText={} */}
					<TextInput style={styles.input} autoCorrect={false} />
					<Icon name="search" color="#000" size={20} />
				</View>
			</View>
			<View style={styles.thirdRow}>
				<View style={styles.animalBoxRow}>
					<View style={styles.animalBox}>
						<Icon name="question" color="#FFF" size={120}></Icon>
					</View>
					<View style={styles.animalBox}>
						<Icon name="question" color="#FFF" size={120}></Icon>
					</View>
				</View>
				<View style={styles.animalBoxRow}>
					<View style={styles.animalBox}></View>
					<View style={styles.animalBox}></View>
				</View>
				<View style={styles.animalBoxRow}>
					<View style={styles.animalBox}></View>
					<View style={styles.animalBox}></View>
				</View>
				<View style={styles.animalBoxRow}>
					<View style={styles.animalBox}></View>
					<View style={styles.animalBox}></View>
				</View>
			</View>
			<View style={styles.row}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: '#FFF',
		paddingRight: 18,
		paddingLeft: 18,
	},
	firstRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	secundRow: {
		flex: 1,
		alignItems: 'center',
		marginBottom: 8,
	},
	thirdRow: {
		flex: 10,
		paddingRight: 7,
		paddingLeft: 7,
		// alignItems: 'center',
	},
	text: {
		fontSize: 20,
		marginBottom: 10,
	},
	textFieldContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 280,
		height: 35,
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 3,
		paddingRight: 5,
	},
	input: {
		flex: 1,
	},
	animalBoxRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 30,
	},
	animalBox: {
		backgroundColor: '#393939',
		width: 162,
		height: 210,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
