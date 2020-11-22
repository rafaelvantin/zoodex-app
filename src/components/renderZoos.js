import React, { useState, useContext, useEffect } from "react";

import {
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { ZooContext } from "../store/zooContext";

import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function RenderZoos() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [numSlides, setNumSlides] = useState([]);
  const [zoos, setZoos] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const navigation = useNavigation();

  const { foundZoos, fetchZooInfo, saveActiveZoo } = useContext(ZooContext);

  const loadZoos = async () => {
    setNumSlides([]);
    for (let i = 0; i < foundZoos.length; i++) setNumSlides([...numSlides, i]);

    const newZoos = await Promise.all(foundZoos.map(async (item) => await fetchZooInfo(item))); 
    setZoos(newZoos);

    if(zoos.length > 0) setShowInfo(true);
  };

  useEffect(() => {loadZoos()}, [foundZoos]);
  

  const onScroll = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (currentSlide !== slide) setCurrentSlide(slide);
  };

  const onEnterPress = (id) => {
    saveActiveZoo(id);
    navigation.navigate("Home");
  };

  const RenderZooItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: "white", width, height }}>
        <View style={styles.imageContainer}>
          <View style={styles.imageMask}>
            {item.avatar ? <Image style={styles.image} source={{ uri: item.avatar }} /> : <View style={styles.image} />}
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.zooName}>{item.name}</Text>
          <Text style={styles.zooLocation}>{item.address && `${item.address.city} ${item.address.state}`}</Text>
        </View>
        <TouchableHighlight underlayColor="white" style={styles.button} onPress={() => onEnterPress(item._id)}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.buttonText}>ENTRAR</Text>
            <AntDesign name="arrowright" size={25} color="#A5D774" />
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} onScroll={onScroll}>
        {zoos.length > 0 ? (
          zoos.map((item, index) => item ? <RenderZooItem key={index} item={item} /> : <ActivityIndicator key={index} style={styles.animation} color="#1e1e1e" size="large" />)
        ) : (
          <ActivityIndicator style={styles.animation} color="#1e1e1e" size="large" />
        )}
      </ScrollView>
      <View style={styles.pageIndex}>
        {foundZoos.length > 0 &&
          foundZoos.map((item, index) => (
            <Text key={index} style={index == currentSlide ? styles.activeText : styles.inactiveText}>
              ⬤
            </Text>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  foundContainer: {
    width: "100%",
    height: 140,
    marginBottom: 40,
  },
  animation: {
    width: width,
    height: height,
  },
  imageContainer: {
    marginTop: 40,
    marginBottom: 40,
    width: "100%",
    height: height / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageMask: {
    width: width,
    height: width,
    padding: 20,
    borderRadius: 200,
  },
  image: {
    flex: 1,
    opacity: 0.8,
    borderRadius: 200,
    resizeMode: "cover",
  },
  textContainer: {
    marginLeft: 20,
  },
  zooName: {
    fontFamily: "Montserrat-bold",
    fontSize: 50,
  },
  zooLocation: {
    fontFamily: "Montserrat-regular",
    fontSize: 20,
  },
  button: {
    marginTop: 100,
    height: 50,
    width: "40%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Montserrat-bold",
    color: "#A5D774",
    fontSize: 20,
    marginRight: 5,
  },

  pageIndex: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    zIndex: 99,
    bottom: 5,
  },
  activeText: {
    color: "#0e0e0e",
  },
  inactiveText: {
    color: "#2a2a2a",
    opacity: 0.5,
  },
});
