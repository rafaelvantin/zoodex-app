import React from "react";

import {
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import DrawerIcon from "../components/drawerIcon.js";

export default function AboutUs() {
  return (
    <View style={styles.container}>
        <View style={styles.logosContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.zoodexImage} source={require('../../assets/logo.png')} />
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.ctiImage} source={require('../../assets/cti.png')} />
            </View>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.text}> O aplicativo Zoodex é o TCC da equipe Coffuel no Colégio Técnico Industrial de Bauru, no ano de 2020.
            </Text>
            <Text style={styles.text}> Nosso objetivo era criar uma experiência digital para as visitas aos zoológicos que complementariam as experiências físicas
              e tornariam a visita ainda mais marcante!</Text>
        </View>
        <View style={styles.footer}>
            <View style={styles.imageContainer}>
                <Image style={styles.coffuelImage} source={require('../../assets/coffuel.jpeg')} />
                <Text style={styles.footerText}>Bom divertimento! :)</Text>
            </View>
        </View>
        <DrawerIcon dark="true" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logosContainer: {
      flexDirection: "row",
      alignSelf: "center",
      width: "100%",
      height: 210,
  },
  imageContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  zoodexImage: {
    resizeMode: "contain",
    height: 120,
  },
  ctiImage: {
    resizeMode: "contain",
    height: 60,
  },

  textContainer: {
      height: 400,
      width: "100%",
      textAlign: "center",
  },
  text: {
      fontFamily: "Montserrat-regular",
      fontSize: 20,
  },
  
  footer: {
      position: "absolute",
      alignSelf: "center",
      bottom: 0, 
      width: "100%",
      height: 100,
      alignItems: "center",
      marginBottom: 12,
      opacity: 0.8,
  },
  coffuelImage: {
    resizeMode: "contain",
    height: 80,
    alignSelf: "center",
  },
  footerText: {
    fontFamily: "Montserrat-regular",
    fontSize: 15,
 },


});
