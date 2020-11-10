import React, { useState, useEffect, useContext } from "react";

import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import LottieView from "lottie-react-native";

import { searchAnimalById } from "../services/animals";

import { ZooContext } from "../store/zooContext";


const { width, height } = Dimensions.get("window");

export default function Animal({ route, navigation }) {
  const [animal, setAnimal] = useState({});

  const { activeZoo } = useContext(ZooContext);

  useEffect(() => {
    if(route.params.animal != null) setAnimal(route.params.animal);
    if(route.params.animalId != null)
      searchAnimalById(route.params.animalId, activeZoo).then((res) => setAnimal(res));
  }, []);

  if(animal == null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.animation} color="#1e1e1e" size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.backIconContainer}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="md-arrow-back" color="white" size={50} />
        </TouchableHighlight>
      </View>

      <Image source={{ uri: animal.avatar }} style={styles.image} />

      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={["transparent", "#000"]}
          style={styles.gradient}
        >
          <View style={styles.footer}>
            <Text style={styles.name}>{animal.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="md-people" color="#43adfb" size={28} />
              <Text style={styles.position}>{animal.timesCaptured}</Text>
            </View>
          </View>

          <View style={styles.bookContainer}>
            <TouchableHighlight
              onPress={() => navigation.navigate("AnimalInfo", { animal: animal })}
              underlayColor="transparent"
              style={{ flex: 1 }}
            >
              <LottieView
                style={{ margin: "-40%" }}
                source={require("../../assets/book-animation.json")}
                autoPlay
                loop
              />
            </TouchableHighlight>
          </View>
        </LinearGradient>
      </View>

      {/* {showInfo ? (
        <View style={styles.notebookContainer}>
          <Image
            source={require("../../assets/notebook.png")}
            style={styles.notebookImage}
          />

          <View style={styles.infoContainer}>
            {animalInfo.map((item) => (
              <View style={styles.infoRowContainer} key={item.type}>
                <Text style={styles.infoText}>{item.value}</Text>
                <Text style={styles.infoType}>{item.type}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  animation: {
    width: width,
    height: height,
  },

  backIconContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  image: {
    height: "100%",
    resizeMode: "cover",
  },

  gradientContainer: {
    position: "absolute",
    bottom: 0,
    height: "42%",
    width: "100%",
    zIndex: 99,
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
  },

  footer: {
    marginLeft: 10,
    marginBottom: 20,
  },
  name: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  position: {
    marginLeft: 5,
    color: "#fff",
    fontSize: 20,
  },

  sidebar: {
    position: "absolute",
    right: 10,
    bottom: 0,
    height: "80%",
  },
  likesContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  count: {
    color: "#fff",
    fontSize: 12,
  },

  bookContainer: {
    position: "absolute",
    bottom: 10,
    right: 5,
    height: "25%",
    width: "25%",
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
    fontSize: 10,
    opacity: 0.6,
  },
  infoText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
