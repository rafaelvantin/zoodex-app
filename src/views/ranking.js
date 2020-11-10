import React,{ useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import DrawerIcon from "../components/drawerIcon.js";

import { AnimalContext } from "../store/animalContext";

export default function Ranking() {

  const { animals } = useContext(AnimalContext);

  const [animalsSorted, setAnimalsSorted] = useState([]);

  useEffect(() => {
    setAnimalsSorted(
      animals.sort((a, b) => {
        if (a.timesCaptured > b.timesCaptured) return -1;
        if (a.timesCaptured < b.timesCaptured) return 1;
        return 0;
      })
    );
  }, []);

  const listHeaderComponent = (
    <View style={styles.headerContainer}>
      <DrawerIcon />
      <LinearGradient colors={["#19A186", "#F2CF43"]} style={styles.linearGradient}>
        <Text style={styles.title}>RANK</Text>

        <View style={styles.columns}>
          <View style={styles.columnNameContainer}>
            <Text style={styles.columnName}>NOME</Text>
          </View>
          <View style={styles.columnTimesContainer}>
            <Ionicons name="md-people" color="#fff" size={32} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.positionContainer}>
          <Text style={styles.position}>{index + 1}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarMask}>
            <Image style={styles.avatar} source={{ uri: item.avatar }} />
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.timesContainer}>
          <Text style={styles.times}>{item.timesCaptured}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ListHeaderComponent={listHeaderComponent}
        keyExtractor={(item) => item._id}
        data={animalsSorted}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 350,
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    marginTop: 120,
    marginLeft: 20,
    color: "white",
    fontSize: 80,
    fontFamily: "Montserrat-bold",
  },

  columns: {
    position: "absolute",
    bottom: 20,
    paddingLeft: 100,
    alignItems: "center",
    flexDirection: "row",
  },

  columnNameContainer: {
    flexBasis: 0,
    flexGrow: 5,
  },
  columnTimesContainer: {
    flexBasis: 0,
    flexGrow: 1,
  },

  columnName: {
    fontFamily: "Montserrat-bold",
    color: "white",
    fontSize: 20,
  },
  columnLikes: {
    color: "white",
    fontSize: 20,
  },
  columnTimes: {
    color: "white",
    fontSize: 20,
  },

  rowContainer: {
    paddingHorizontal: 5,
    width: "100%",
    height: 70,
    borderColor: "#1e1e1e",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },

  avatarMask: {
    height: 48,
    width: 48,
  },

  positionContainer: {
    flexBasis: 0,
    flexGrow: 1.2,
    alignItems: "center",

  },
  avatarContainer: {
    flexBasis: 0,
    flexGrow: 3,
    alignItems: "center",
  },
  nameContainer: {
    flexBasis: 0,
    flexGrow: 12,
  },
  timesContainer: {
    flexBasis: 0,
    flexGrow: 1.5,
  },
  position: {
    fontFamily: "Montserrat-bold",
    fontSize: 25,
    opacity: 0.9,
  },
  avatar: {
    borderRadius: 10,
    flex: 1,
    opacity: 1,
    resizeMode: "cover",
  },
  name: {
    fontFamily: "Montserrat-regular",
    fontSize: 18,
    opacity: 0.9,
  },

  times: {
    fontFamily: "Montserrat-bold",
    fontSize: 20,
    color: "#7CAA4B",
  },
});
