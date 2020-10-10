import React, { useState, useContext, useEffect } from "react";

import { View, TouchableHighlight, StyleSheet, Dimensions, Alert, ActivityIndicator } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

import { Ionicons } from "@expo/vector-icons";

import { searchZoo } from "../services/zoo";

import { ZooContext } from "../store/zooContext";

export default function PrizeAnimal({ closeOverlay }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState("");

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
    searchZoo(data.substring(9))
      .then((res) => {
        if (res._id != "") return saveNewZoo(data.substring(9)).then(() => closeOverlay());
        Alert.alert("Erro", "Zoológico não encontrado", [{ text: "Ok", onPress: () => closeOverlay() }]);
      })
      .catch(() => Alert.alert("Erro", "Erro no scan", [{ text: "Ok", onPress: () => closeOverlay() }]));
    //zoodex://
    //COLOCAR UM ALERTAR COM INDICADOR DE ATIVIDADE
  };

  return (
    <View style={styles.overlayContainer}>
      {scannedData == "" ? (
        <>
          <TouchableHighlight
            style={styles.closeOverlayIcon}
            onPress={() => closeOverlay()}
            underlayColor="transparent"
          >
            <Ionicons name="md-close" size={50} color="white" />
          </TouchableHighlight>
          <View style={styles.overlayCard}>
            <BarCodeScanner
              onBarCodeScanned={scannedData ? undefined : onRead}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
              style={StyleSheet.absoluteFill}
            />
          </View>
        </>
      ) : (
        <ActivityIndicator color="white" size="large" />
      )}
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
