import React, { useState, useEffect } from "react";

import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  ScrollView,
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import LottieView from "lottie-react-native";

import searchAnimalById from "../services/animals";

export default function Animal({ route, navigation }) {
  // const { animalId } = route.params;
  // const [animal, setAnimal] = useState({});

  // useEffect(() => {
  //   if(animalId == null) return;
  //   searchAnimalById(animalId).then((res) => setAnimal(res));
  // }, []);

  const [userLiked, setUserLiked] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const animal = {
    name: "Tigre de Sumatra",
    likes: 30,
    position: 19,
  };

  const image =
    "https://cdn.vox-cdn.com/thumbor/GzQa3VMNyAITTPQU7ZYMfOjg6lQ=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19873983/GettyImages_137497593.jpg";

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
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="md-arrow-back" color="white" size={50} />
        </TouchableHighlight>
      </View>

      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={["transparent", "#000"]}
          style={styles.gradient}
        >
          <View style={styles.footer}>
            <Text style={styles.name}>{animal.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="md-people" color="#43adfb" size={28} />
              <Text style={styles.position}>{animal.position}</Text>
            </View>
          </View>

          {/* <View style={styles.sidebar}>
            <View style={styles.likesContainer}>
              {userLiked ? (
                <AntDesign
                  name="heart"
                  color="#d92027"
                  size={35}
                  onPress={() => setUserLiked(false)}
                />
              ) : (
                <AntDesign
                  name="hearto"
                  color="#fff"
                  size={35}
                  onPress={() => setUserLiked(true)}
                />
              )}
              <Text style={styles.count}>{animal.likes}</Text>
            </View>
            <View style={styles.likesContainer}>
              <Ionicons name="md-share" color="#fff" size={30} />
              <Text style={styles.count}>Share</Text>
            </View>
          </View> */}

          <View style={styles.bookContainer}>
            <TouchableHighlight
              // onPress={() => setShowInfo(!showInfo)}
              onPress={() => navigation.navigate("AnimalInfo")}
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
