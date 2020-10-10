import React from "react";

import { View, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

export default function DrawerIcon({ dark }) {
  const navigation = useNavigation();

  return (
    <View style={dark ? styles.darkIconContainer : styles.iconContainer}>
      <Ionicons name="md-menu" size={55} color={dark ? "#1e1e1e" : "#fff"} onPress={() => navigation.openDrawer()} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 99,
    height: 60,
    width: 60,
    borderColor: "#fff",
    borderRadius: 40,
    // borderWidth: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  darkIconContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 99,
    height: 60,
    width: 60,
    borderColor: "#1e1e1e",
    borderRadius: 40,
    // borderWidth: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
});
