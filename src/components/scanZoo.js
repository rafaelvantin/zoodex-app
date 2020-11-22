import React, { useState, useContext, useEffect } from "react";

import { View, TouchableHighlight, StyleSheet, Dimensions, Alert, ActivityIndicator, Text } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

import { Ionicons } from "@expo/vector-icons";

import { validateZoo } from "../services/zoo";

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
    validateZoo(data.substring(9))
      .then(() => saveNewZoo(data.substring(9)).then(() => closeOverlay()))
      .catch(({ response }) => Alert.alert("Erro no Scan!", response.data.valid === false ? response.data.error : "Erro no scan", [{ text: "Ok", onPress: () => closeOverlay() }]));
  };
  
  if(!hasPermission){
    return(
      <View style={styles.overlayContainer}>
        <View style={styles.overlayCard}>
           <Text style={{color: 'white'}}>Por favor, conceda a permissão para usar a câmera.</Text>
         </View>
      </View>
    )
  }

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
    justifyContent: "center",
    width: "90%",
    height: "70%",
    borderRadius: 10,
    backgroundColor: "#1e1e1e",
    paddingTop: 5,
    paddingLeft: 12,
    paddingRight: 12,
  },
});
