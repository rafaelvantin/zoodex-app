import React, { useEffect, useState, useContext } from "react";

import { BarCodeScanner } from "expo-barcode-scanner";

import { View, StyleSheet, Text } from "react-native";

import { AnimalContext } from "../store/animalContext";

import AsyncStorage from "@react-native-community/async-storage";

export default function ScanQR({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  const { saveFoundAnimal } = useContext(AnimalContext);

  useEffect(() => {
    async function checkPermission() {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    }
    checkPermission();
  }, []);

  const onRead = ({ data, type }) => {
    setScannedData(data);
    //zoodex://id_animal:
    saveFoundAnimal(data.substring(19)).then(() => {
      navigation.navigate("Animal", { animalId: data });
      setScannedData(null);
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
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
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    opacity: 0.97,
  },
});
