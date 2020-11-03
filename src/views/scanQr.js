import React, { useEffect, useState, useContext } from "react";

import { BarCodeScanner } from "expo-barcode-scanner";

import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";

import { AnimalContext } from "../store/animalContext";
import { ZooContext } from "../store/zooContext";

import { validateAnimal } from "../services/animals";

import AsyncStorage from "@react-native-community/async-storage";

export default function ScanQR({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState("");

  const { activeZoo } = useContext(ZooContext);
  const { saveFoundAnimal } = useContext(AnimalContext);

  useEffect(() => {
    async function checkPermission() {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    }
    checkPermission();
  }, []);
  
  const onRead = ({ data }) => {
    const id = data.substring(9);
    setScannedData(data);
    validateAnimal(id, activeZoo)
    .then(() => {
      setScannedData("");
      saveFoundAnimal(id).then(() => navigation.navigate("Animal"))
      .catch(() => Alert.alert("Erro", "Erro na hora de salvar o animal", [{ text: "Ok", onPress: () => setScannedData("") }]));
    })
    .catch(({ response }) => Alert.alert("Erro", response.data.valid === false ? response.data.error : "Erro no scan", [{ text: "Ok", onPress: () => setScannedData("") }]));
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {scannedData == "" ? (
          <BarCodeScanner
            onBarCodeScanned={scannedData ? undefined : onRead}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <ActivityIndicator
            style={{ position: "absolute", top: 0, bottom: 0, alignSelf: "center" }}
            size="large"
            color="white"
          />
        )}
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
