import React, { useState } from 'react';

import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// onPress={() => navigation.openDrawer()}

export default function Home({ navigation }) {
	const [searchInput, setSearchInput] = useState(null);

	const [animals, setAnimals] = useState([
		{ key: '3', d: '1' },
		{ key: '4' },
		{ key: '5' },
		{ key: '6' },
		{ key: '7' },
		{ key: '8' },
		{ key: '9' },
	]);

	const listHeaderComponent = (
		<View style={styles.headerContainer}>
			<View style={styles.firstRow}>
				<Icon name="menu-outline" size={35} onPress={() => navigation.openDrawer()} />
				<Icon name="star-outline" color="#e5c100" size={32} />
				<Icon name="cog" size={33} />
			</View>
			<View style={styles.secundRow}>
				<View style={styles.textFieldContainer}>
					<TextInput
						style={{ flex: 1 }}
						autoCorrect={false}
						onChangeText={(text) => setSearchInput(text)}
					/>
					<Icon name="search" color="#000" size={20} />
				</View>
			</View>
		</View>
	);

	const renderItem = ({ item }) => {
		if (item.isEmpty) {
			return (
				<View style={[styles.animalBox, { backgroundColor: 'transparent' }]}>
					<Icon name="question" color="transparent" size={120} />
				</View>
			);
		}
		return (
			<View style={styles.animalBox}>
				<Icon name="question" color="#FFF" size={120} />
			</View>
		);
	};

	const createRows = (data) => {
		if (data.length % 2 !== 0) {
			data.push({
				key: 'empty',
				isEmpty: true,
			});
		}
		return data;
	};

	return (
		<View style={styles.container}>
			<View style={styles.listContainer}>
				<FlatList
					ListHeaderComponent={listHeaderComponent}
					numColumns={2}
					keyExtractor={(item) => item.key}
					data={createRows(animals)}
					renderItem={renderItem}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fdfdfd',
	},
	headerContainer: {
		flex: 1,
		justifyContent: 'flex-start',
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
	listContainer: {
		marginLeft: 8,
		marginRight: 8,
	},
	animalBox: {
		backgroundColor: '#393939',
		height: 210,
		flexGrow: 1,
		alignItems: 'center',
		marginBottom: 8,
		justifyContent: 'center',
		margin: 3,
	},
});
