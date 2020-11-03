import React, { useContext } from "react";

import { View, ScrollView, Text, Image, StyleSheet, FlatList, Dimensions } from "react-native";

import { ZooContext } from "../store/zooContext";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import DrawerIcon from "../components/drawerIcon.js";

const { width, height } = Dimensions.get("window");

const Divider = () => {
  return (
    <View
      style={{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "black",
        marginBottom: 5,
        opacity: 0.5,
      }}
    />
  );
};

export default function ZooInfo({ navigation }) {
  const { zooInfo } = useContext(ZooContext);

  const RenderInfoItem = ({ item }) => (
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{item.title} ©️</Text>
      <Text style={styles.info}>{item.info}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DrawerIcon dark={true} />
      <LinearGradient colors={["#fff", "#fff"]} style={styles.gradient}>
        <ScrollView style={styles.container}>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <View style={styles.imageMask}>
                <Image style={styles.image} source={{ uri: zooInfo.avatar }} />
              </View>
            </View>
            <Text style={styles.name}>{zooInfo.name}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Contatos 📞</Text>
              <Text style={styles.info}>{zooInfo.contacts[0].phone}</Text>
              { zooInfo.contacts[1] && <Text style={styles.info}>{zooInfo.contacts[1].phone}</Text>}
            </View>
            <Divider />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Endereço 🏠</Text>
              <Text style={styles.info}>
                {zooInfo.address.city} - {zooInfo.address.state}
              </Text>
              <Text style={styles.info}>{zooInfo.address.street}</Text>
            </View>

            {zooInfo.additionalInfo.length > 0 && zooInfo.additionalInfo.map((item, index) => (
              <View key={index}>
                <Divider />
                <RenderInfoItem item={item} />
              </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginTop: 10,
    alignSelf: "center",
    width: "100%",
    borderRadius: 30,
  },
  imageContainer: {
    alignSelf: "center",
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  imageMask: {
    width: 300,
    height: 300,
    padding: 20,
    borderRadius: 40,
  },
  image: {
    flex: 1,
    opacity: 1,
    borderRadius: 40,
    resizeMode: "contain",
  },

  name: {
    fontFamily: "Montserrat-bold",
    // color: "white",
    color: "black",
    fontSize: 40,
    alignSelf: "center",
    marginBottom: 30,
  },
  title: {
    fontFamily: "Montserrat-bold",
    // color: "white",
    color: "black",
    fontSize: 20,
    marginBottom: 5,
  },
  infoContainer: {
    marginBottom: 20,
  },
  info: {
    fontFamily: "Montserrat-regular",
    // color: "white",
    color: "black",
    fontSize: 14,
  },
  gradient: {
    flex: 1,
    // borderRadius: 30,
    paddingHorizontal: 30,
  },
});
