import React, { useState, useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import { ZooContext } from "../store/zooContext";

import Icon from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AsyncStorage from "@react-native-community/async-storage";

import { Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export default function DrawerContent(props) {
  const [activeRoute, setActiveRoute] = useState("Home");

  const { leaveZoo } = useContext(ZooContext);

  const tabs = [
    {
      label: "Início",
      routeName: "Home",
      icon: "md-home",
    },
    {
      label: "Ranking",
      routeName: "Ranking",
      icon: "md-trophy",
    },
    {
      label: "Mapa",
      routeName: "Maps",
      icon: "md-map",
    },
    {
      label: "Zoológico",
      routeName: "ZooInfo",
      icon: "ios-leaf",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#008000" }}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.drawerSection}>
          {tabs.map((item) => (
            <DrawerItem
              key={item.routeName}
              icon={({ color, size }) => <Icon name={item.icon} color={color} size={size} />}
              activeBackgroundColor="white"
              activeTintColor="#008000"
              inactiveTintColor="#fcfcfc"
              focused={item.routeName === activeRoute}
              label={item.label}
              onPress={() => {
                setActiveRoute(item.routeName);
                props.navigation.navigate(item.routeName);
              }}
            />
          ))}
        </Drawer.Section>
        <Drawer.Section>
          {/* <DrawerItem
            icon={({ size }) => <Icon name="md-settings" color="#fcfcfc" size={size} />}
            activeBackgroundColor="white"
            activeTintColor="#008000"
            inactiveTintColor="#fcfcfc"
            focused={activeRoute === "Settings"}
            label="Settings"
            onPress={async () => await AsyncStorage.clear()}
          /> */}
          <DrawerItem
            icon={({ color, size }) => <Icon name="md-information-circle" color={color} size={size} />}
            activeBackgroundColor="white"
            activeTintColor="#008000"
            inactiveTintColor="#fcfcfc"
            focused={activeRoute === "AboutUs"}
            label="Sobre o aplicativo"
            onPress={() => {
              setActiveRoute("AboutUs");
              props.navigation.navigate("AboutUs");
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          label="Sair do Zoo"
          onPress={() => leaveZoo()}
          inactiveTintColor="#fcfcfc"
          icon={({ color, size }) => <Icon name="md-log-out" color={color} size={size} />}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    resizeMode: "contain",
    height: 140,
  },
});
