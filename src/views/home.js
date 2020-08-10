import React, { useState } from 'react';

import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// onPress={() => navigation.openDrawer()}

export default function Home({ navigation }) {
	const [searchInput, setSearchInput] = useState(null);

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
						style={styles.input}
						autoCorrect={false}
						onChangeText={(text) => setSearchInput(text)}
					/>
					<Icon name="search" color="#000" size={20} />
				</View>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList
				ListHeaderComponent={listHeaderComponent}
				numColumns={2}
				keyExtractor={(item) => item.key}
				data={[
					{ key: '3', d: '1' },
					{ key: '4' },
					{ key: '5' },
					{ key: '6' },
					{ key: '7' },
					{ key: '8' },
					{ key: '9' },
				]}
				renderItem={() => (
					<View style={styles.animalBox}>
						<Icon name="question" color="#FFF" size={120} />
					</View>
				)}
			/>
			<View style={styles.row} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#fdfdfd',
	},
	headerContainer: {
		flex: 1,
		justifyContent: 'flex-start',
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
	animalBox: {
		backgroundColor: '#393939',
		height: 210,
		flexGrow: 1,
		alignItems: 'center',
		marginBottom: 8,
		justifyContent: 'center',
	},
});
