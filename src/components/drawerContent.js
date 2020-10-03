import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../store/userContext";

import Icon from "react-native-vector-icons/Ionicons";

import { Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export default function DrawerContent(props) {
  const [activeRoute, setActiveRoute] = useState("Home");

  const { leaveZoo } = useContext(UserContext);

  const tabs = [
    {
      label: "Home",
      routeName: "Home",
      icon: "md-home",
    },
    {
      label: "Ranking",
      routeName: "Ranking",
      icon: "md-trophy",
    },
    {
      label: "Como Chegar",
      routeName: "Location",
      icon: "md-navigate",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#5B8232" }}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.drawerSection}>
          {tabs.map((item) => (
            <DrawerItem
              key={item.routeName}
              icon={({ color, size }) => (
                <Icon name={item.icon} color={color} size={size} />
              )}
              activeBackgroundColor="white"
              activeTintColor="#5B8232"
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
          <DrawerItem
            icon={({ size }) => (
              <Icon name="md-settings" color="#fcfcfc" size={size} />
            )}
            activeBackgroundColor="white"
            activeTintColor="#5B8232"
            inactiveTintColor="#fcfcfc"
            focused={activeRoute === "Settings"}
            label="Settings"
            onPress={() => {
              setActiveRoute("Settings");
              props.navigation.navigate("Settings");
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          label="Leave Zoo"
          onPress={() => leaveZoo()}
          inactiveTintColor="#fcfcfc"
          icon={({ color, size }) => (
            <Icon name="md-log-out" color={color} size={size} />
          )}
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
});
