import React from "react";

import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TouchableHighlight,
  Dimensions
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Animal({ navigation }) {

  const animalInfo = [
    {
      type: "Nome científico",
      value: "Panthera Tigris Sumatrae",
    },
    {
      type: "Filo",
      value: "Chordata",
    },
    {
      type: "Classe",
      value: "Mamíferos",
    },
    {
      type: "Família",
      value: "Felidae",
    },
    {
      type: "Alimentacao",
      value: "Carnivoro",
    },
    {
      type: "Habitat",
      value: "Floresta Montanhosa",
    },
    {
      type: "Expectativa",
      value: "18-25 anos",
    },
  ];

  return ( 
    <View style={styles.container}>
        <View style={styles.backIconContainer}>
            <TouchableHighlight
            underlayColor="transparent"
            onPress={() => navigation.navigate("Animal")}
            >
            <Ionicons name="md-arrow-back" color="black" size={50} />
            </TouchableHighlight>
        </View>

        <Image
        source={require("../../assets/notebookBG.png")}
        style={styles.image}
        />

         <View style={styles.notebookContainer}>
          <View style={styles.infoContainer}>
            {animalInfo.map((item) => (
              <View style={styles.infoRowContainer} key={item.type}>
                  <Text style={styles.infoText}>{item.value}</Text>
                  <Text style={styles.infoType}>{item.type}</Text>
                </View>
              ))}
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },

  backIconContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  image: {
    opacity: 0.3,
    height: "110%",
    width: "100%",
    resizeMode: "cover",
  },

  notebookContainer: {
    position: "absolute",
    top: 50,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "65%",
    zIndex: 9999,
  },
  notebookImage: {
    resizeMode: "contain",
    flex: 1,
  },

  infoContainer: {
    position: "absolute",
    top: 40,
  },
  infoRowContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  infoType: {
    fontSize: 12,
    opacity: 0.7,
  },
  infoText: {
    fontWeight: "bold",
    fontSize: 22,
  },
});
