import React, { useContext } from "react";

import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function AnimalItem({ item, foundAnimals }) {
  const isAnimalDiscovered = foundAnimals.includes(item.key);

  const navigation = useNavigation();

  const animalDiscoveredBox = (
    <TouchableHighlight
      style={[
        styles.animalBox,
        { alignItems: "stretch", backgroundColor: "#C5FA84" },
      ]}
      onPress={() => navigation.navigate("Animal", { animalId: item.id })}
    >
      <View style={{ flexGrow: 1, backgroundColor: "transparent" }}>
        <Image source={{ uri: item.image }} style={styles.animalImage} />
      </View>
    </TouchableHighlight>
  );

  const animalUnknownBox = (
    <TouchableHighlight style={styles.animalBox}>
      <Ionicons name="md-help" color="#FFF" size={120} />
    </TouchableHighlight>
  );

  return (
    <View style={{ flexGrow: 1, flexDirection: "row" }}>
      {isAnimalDiscovered ? animalDiscoveredBox : animalUnknownBox}
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>
          {isAnimalDiscovered ? item.name : `#unknown`}
        </Text>
        <Text style={styles.scientificNameText}>
          {isAnimalDiscovered ? item.scientificName : "?"}
        </Text>
        <View style={styles.habitatContainer}>
          <MaterialCommunityIcons name="tree" color="#7CAA4B" size={32} />
          <Text style={styles.habitatText}>
            {isAnimalDiscovered ? item.habitat : "?"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animalBox: {
    backgroundColor: "#393939",
    height: 140,
    width: 140,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "center",
    margin: 3,
  },
  animalImage: {
    flex: 1,
    opacity: 0.8,
    borderRadius: 10,
    resizeMode: "cover",
  },
  animalIdText: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    opacity: 1,
    position: "absolute",
    bottom: 5,
    left: 5,
  },
  infoContainer: {
    marginTop: 10,
    marginLeft: 8,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  scientificNameText: {
    opacity: 0.7,
    fontSize: 10,
    fontStyle: "italic",
    marginLeft: 3,
  },
  habitatContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  habitatText: {
    fontSize: 15,
    opacity: 0.7,
  },
});
