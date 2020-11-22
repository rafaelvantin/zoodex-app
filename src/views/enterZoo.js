import React, { useState, useContext, useEffect, useRef } from "react";

import { View, ScrollView, Text, Image, StyleSheet, TouchableHighlight, Dimensions } from "react-native";

import { ZooContext } from "../store/zooContext";

import ScanZoo from "../components/scanZoo.js";
import RenderZoos from "../components/renderZoos.js";

import { MaterialIcons } from "@expo/vector-icons";

export default function EnterZoo({ navigation }) {
  const { foundZoos } = useContext(ZooContext);
  const [overlayOn, setOverlayOn] = useState(false);

  const noZoosFound = () => {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.warningText}>Você não tem nenhum zoológico cadastrado ainda.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {foundZoos.length == 0 ? noZoosFound() : <RenderZoos />}
      <TouchableHighlight style={styles.buttonAdd} onPress={() => setOverlayOn(true)}>
        <MaterialIcons name="playlist-add" size={40} color="black" />
      </TouchableHighlight>
      {overlayOn && <ScanZoo closeOverlay={() => setOverlayOn(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonAdd: {
    position: "absolute",
    right: 20,
    bottom: 40,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.8,
    borderColor: "#1e1e1e",
    borderRadius: 40,
    opacity: 0.8,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  warningText: {
    fontFamily: "Montserrat-light",
    fontSize: 13,
  },
});
