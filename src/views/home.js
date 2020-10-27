import React, { useState, useContext, useEffect } from "react";

import { View, StyleSheet, FlatList, TouchableHighlight, ActivityIndicator } from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { AnimalContext } from "../store/animalContext.js";

import AnimalItem from "../components/animalItem.js";
import PrizeAnimal from "../components/prizeAnimal.js";

import LottieView from "lottie-react-native";

export default function Home({ navigation }) {
  const [overlayOn, setOverlayOn] = useState(false);

  const { animals } = useContext(AnimalContext);

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

  const renderAnimalItem = ({ item }) => <AnimalItem item={item} />;

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
      {animals.length > 0 ? (
        renderList()
      ) : (
        <LottieView source={require("../../assets/loader.json")} autoPlay loop />
      )}

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
