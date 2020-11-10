import React, { useState, useContext, useEffect, useRef } from "react";

import { View, Text, Image, StyleSheet, Animated, Easing } from "react-native";

import { UserContext } from "../store/userContext";

import AsyncStorage from "@react-native-community/async-storage";

const LogoFade = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const LogoTransform = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  });

  return (
    <Animated.Image
      source={require("../../assets/logo.png")}
      style={[
        styles.image,
        {
          transform: [
            {
              scaleX: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1.0, 1.0],
              }),
            },
            {
              scaleY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1.0, 1.0],
              }),
            },
          ],
        },
      ]}
    />
  );
};

export default function EnterZoo({ navigation }) {
  const { getUsername } = useContext(UserContext);
  const [loadHome, setLoadHome] = useState(false);

  setTimeout(() => setLoadHome(true), 1150  );

  useEffect(() => {
    if (loadHome) getUsername != "" ? navigation.navigate("Home") : navigation.navigate("InitialSlides");
  }, [loadHome]);

  return (
    <View style={styles.container}>
        <LogoTransform />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
    alignItems: "center",
  },
  logoContainer: {
    width: "100%",
    height: 300,
    marginTop: 90,
    alignItems: "center",
  },
  image: {
    height: "90%",
    resizeMode: "contain",
  },
  textContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  headline: {
    fontFamily: "Montserrat-light",
    fontSize: 10,
    marginBottom: 15,
  },
  imageContainer: {
    width: 150,
    alignItems: "center",
  },
  unespImage: {
    resizeMode: "contain",
    height: 40,
  },
  ctiImage: {
    resizeMode: "contain",
    height: 40,
  },
});
