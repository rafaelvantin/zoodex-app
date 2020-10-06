import React, { useContext } from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";

import { UserContext } from "../store/userContext";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

export default function ZooInfo({ navigation }) {
  const { getAdditionalInfo } = useContext(UserContext);

  const info = [
    {
      title: "História",
      info:
        "Criado em 2002, foi pensado visando multiplicar a importância de animais em extinção.",
    },
    {
      title: "Horários de Visita",
      info:
        "De segunda a sexta: 8 às 17 horas.\nSábado e Domingo: 9 às 12 horas.",
    },
  ];

  const listHeaderComponent = (
    <View style={styles.headerContainer}>
      <View style={styles.firstRow}>
        <Ionicons
          name="md-menu"
          size={45}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
      </View>
    </View>
  );

  const renderInfoItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.title}.</Text>
      <Text style={styles.cardInfo}>{item.info}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#19A186", "#F2CF43"]} style={{ flex: 1 }}>
        <View style={styles.listContainer}>
          <FlatList
            ListHeaderComponent={listHeaderComponent}
            keyExtractor={(item) => item.title}
            data={info}
            renderItem={renderInfoItem}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    backgroundColor: "#7CAA4B",
  },
  listContainer: {
    marginLeft: 8,
    marginRight: 8,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  firstRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardContainer: {
    width: "100%",
    height: 160,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    marginBottom: 20,
    backgroundColor: "#fcfcfc",
    borderRadius: 10,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 30,
    // color: "#fcfcfc",
    color: "#0e0e0e",
    marginBottom: 18,
    fontFamily: "Montserrat-bold",
  },
  cardInfo: {
    fontSize: 15,
    // color: "#fcfcfc",
    color: "#0e0e0e",
    fontFamily: "Montserrat-regular",
  },
});
