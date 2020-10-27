import React, { useEffect, useContext, useState } from "react";

import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { AnimalContext } from "../store/animalContext.js";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function AnimalItem({ item }) {

  const { foundAnimals, getThisFoundAnimals } = useContext(AnimalContext);

  const [isAnimalDiscovered, setIsAnimalDiscovered] = useState(false);

  useEffect(() => {
    if(getThisFoundAnimals().includes(item._id)) setIsAnimalDiscovered(true);
  }, [foundAnimals]);

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
  infoContainer: {
    marginTop: 10,
    marginLeft: 8,
  },
  nameText: {
    fontFamily: "Montserrat-bold",
    fontSize: 22,
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
    fontFamily: "Montserrat-regular",
    fontSize: 14,
    opacity: 0.7,
  },
});
