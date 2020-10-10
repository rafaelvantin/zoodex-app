import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import ZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

import DrawerIcon from "../components/drawerIcon.js";

export default function Maps({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, zIndex: 9 }}>
        <ZoomableView
          maxZoom={1.5}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          captureEvents={true}
        >
          <Image
            source={{
              uri: "https://viajento.files.wordpress.com/2019/05/houston-zoo-estados-unidos-mapa.jpg?w=840",
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
});
