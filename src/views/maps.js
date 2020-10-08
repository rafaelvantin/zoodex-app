import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Maps({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, zIndex: 9 }}>
        <Image
          source={{
            uri:
              "https://viajento.files.wordpress.com/2019/05/houston-zoo-estados-unidos-mapa.jpg?w=840",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.menuIcon}>
        <Ionicons
          name="md-menu"
          size={45}
          color="black"
          onPress={() => navigation.openDrawer()}
        />
      </View>
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
    resizeMode: "cover",
    zIndex: 9,
  },
});
