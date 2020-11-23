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
  const [showButton, setShowButton] = useState(false);

  setTimeout(() => setLoadHome(true), 1150);
  setTimeout(() => setShowButton(true), 2000);

  const continueNavigation = () => {
    if (loadHome) getUsername != "" ? navigation.navigate("Home") : navigation.navigate("InitialSlides");
  }

  useEffect(() => {continueNavigation()}, [loadHome]);

  return (
    <View style={styles.container}>
        {/* <LogoFade style={styles.logoContainer}> */}
        {/* <LogoTransform /> */}
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/logo.png")} style={styles.image} />
          {showButton && <Text style={styles.continueButton} onPress={() => continueNavigation()}>Continuar</Text>}
        </View>
          
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 160,
    resizeMode: "contain",
  },
  continueButton:{
    position: "absolute",
    bottom: 0,
    color: "#fff",
    fontSize: 15,
    fontFamily: "Montserrat-bold"
  }
});
