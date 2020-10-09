import React, { useState, useContext, useEffect } from "react";

import { View, TouchableHighlight, StyleSheet, Text, Dimensions } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

import { Ionicons } from "@expo/vector-icons";

import { ZooContext } from "../store/zooContext";

export default function PrizeAnimal({ closeOverlay }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  const { width, height } = Dimensions.get("window");

  const { saveNewZoo } = useContext(ZooContext);

  useEffect(() => {
    async function checkPermission() {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    }
    checkPermission();
  }, []);

  const onRead = ({ data }) => {
    setScannedData(data);
    //zoodex://
    console.log(data.substring(9));
    saveNewZoo(data.substring(9)).then(() => closeOverlay());
  };

  return (
    <View style={styles.overlayContainer}>
      <TouchableHighlight style={styles.closeOverlayIcon} onPress={() => closeOverlay()} underlayColor="transparent">
        <Ionicons name="md-close" size={50} color="white" />
      </TouchableHighlight>
      <View style={styles.overlayCard}>
        <BarCodeScanner
          onBarCodeScanned={scannedData ? undefined : onRead}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={StyleSheet.absoluteFill}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 99,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeOverlayIcon: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  overlayCard: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
    backgroundColor: "#1e1e1e",
    paddingTop: 5,
    paddingLeft: 12,
    paddingRight: 12,
  },
});
