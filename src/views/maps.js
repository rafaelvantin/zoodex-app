import React, { useContext } from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import { EvilIcons } from '@expo/vector-icons';

import ZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

import DrawerIcon from "../components/drawerIcon.js";

import { ZooContext } from "../store/zooContext";

export default function Maps({ navigation }) {

  const { zooInfo } = useContext(ZooContext);

  if(zooInfo.map == null){
    return(
      <View style={styles.notFoundContainer}>
        <EvilIcons name="exclamation" size={60} color="black" />
        <Text style={styles.warningText}>O zoológico não possui nenhum mapa cadastrado.</Text>
        <DrawerIcon dark="true" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, zIndex: 9 }}>
        <ZoomableView
          style={{backgroundColor: "white"}}
          maxZoom={1.5}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          captureEvents={true}
        >
          <Image
            source={{
              uri: zooInfo.map,
            }}
            style={styles.image}
          />
        </ZoomableView>
      </View>
      <DrawerIcon dark="true" />
    </View>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    position: "absolute",
    left: 5,
    top: 5,
    zIndex: 999,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
    zIndex: 9,
  },

  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  warningText: {
    fontFamily: "Montserrat-light",
    fontSize: 13,
    marginTop: 15,
  },
});
