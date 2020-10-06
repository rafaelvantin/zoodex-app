import React, { useState, useContext, useEffect } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  TextInput,
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { UserContext } from "../store/userContext";
import { AnimalContext } from "../store/animalContext.js";

import AnimalItem from "../components/animalItem.js";
import PrizeAnimal from "../components/prizeAnimal.js";

export default function Home({ navigation }) {
  const [overlayOn, setOverlayOn] = useState(false);

  const { animals } = useContext(AnimalContext);
  const { foundAnimals } = useContext(UserContext);

  const listHeaderComponent = (
    <View style={styles.headerContainer}>
      <View style={styles.firstRow}>
        <Ionicons
          name="md-menu"
          size={45}
          onPress={() => navigation.openDrawer()}
        />
        <TouchableHighlight
          onPress={() => setOverlayOn(true)}
          underlayColor="transparent"
        >
          <AntDesign name="staro" color="#e5c100" size={42} />
        </TouchableHighlight>
      </View>
    </View>
  );

  const renderAnimalItem = ({ item }) => (
    <AnimalItem item={item} foundAnimals={foundAnimals} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          ListHeaderComponent={listHeaderComponent}
          keyExtractor={(item) => item.key}
          data={animals}
          renderItem={renderAnimalItem}
        />
      </View>
      {overlayOn ? (
        <PrizeAnimal closeOverlay={() => setOverlayOn(false)} />
      ) : null}
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
