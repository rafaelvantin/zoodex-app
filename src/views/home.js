import React, { useState, useContext, useEffect } from "react";

import { View, StyleSheet, FlatList, TouchableHighlight } from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { AnimalContext } from "../store/animalContext.js";
import { ZooContext } from "../store/zooContext.js";

import AnimalItem from "../components/animalItem.js";
import PrizeAnimal from "../components/prizeAnimal.js";

export default function Home({ navigation }) {
  const [overlayOn, setOverlayOn] = useState(false);

  const { animals, getThisFoundAnimals } = useContext(AnimalContext);

  useEffect(() => {
    const openScan = navigation.addListener("tabPress", (event) => {
      event.preventDefault();
      console.log(event);
    });
    return openScan;
  }, [navigation]);

  const listHeaderComponent = (
    <View style={styles.headerContainer}>
      <View style={styles.firstRow}>
        <Ionicons name="md-menu" size={45} onPress={() => navigation.openDrawer()} />
        <TouchableHighlight onPress={() => setOverlayOn(true)} underlayColor="transparent">
          <AntDesign name="staro" color="#e5c100" size={42} />
        </TouchableHighlight>
      </View>
    </View>
  );

  const renderAnimalItem = ({ item }) => <AnimalItem item={item} foundAnimals={getThisFoundAnimals} />;

  const renderList = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          ListHeaderComponent={listHeaderComponent}
          keyExtractor={(item) => item._id}
          data={animals}
          renderItem={renderAnimalItem}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {animals.length > 0 && typeof getThisFoundAnimals == "object" ? renderList() : <View></View>}

      {overlayOn ? <PrizeAnimal closeOverlay={() => setOverlayOn(false)} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  firstRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  listContainer: {
    marginLeft: 8,
    marginRight: 8,
  },
});
