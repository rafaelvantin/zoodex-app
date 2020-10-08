import React, { useState, useContext } from "react";

import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import { FeatureContext } from "../store/featureContext";

export default function PrizeAnimal({ closeOverlay }) {
  const [input, setInput] = useState("");

  const {
    triesAvailable,
    saveTriesAvailable,
    getPrizeAnimal,
    foundPrizeAnimal,
    saveFoundPrizeAnimal,
  } = useContext(FeatureContext);

  const hints = [
    "Vivo na Floresta Montanhosa",
    "Tenho uma grande pelagem",
    "Irmão do leão",
  ];

  const displayHints = hints.map((item) => (
    <Text style={styles.hintText}> {item} </Text>
  ));

  const instructions = [
    "Você tem apenas 3 tentativas para acertar o animal.",
    "O animal premiado muda ocasionalmente, portanto se você não ganhou dessa vez, terá outras oportunidades.",
    "Quem descobrir ganhará uma insígnia que poderá ser vista por outros jogadores.",
  ];

  const displayInstructions = (
    <View style={styles.instructionContainer}>
      {instructions.map((item, index) => (
        <Text style={styles.instructionText} key={item}>
          {index + 1}){item}
        </Text>
      ))}
    </View>
  );

  const buttonTry = (
    <TouchableHighlight
      onPress={() => input.length > 0 && sendName()}
      style={styles.button}
    >
      <Text style={styles.buttonText}>ENVIAR</Text>
    </TouchableHighlight>
  );

  const sendName = () => {
    if (triesAvailable == 0) return;
    if (getPrizeAnimal().toLowerCase() != input.trim().toLowerCase())
      return saveTriesAvailable(triesAvailable - 1);
    saveFoundPrizeAnimal(true);
  };

  const FoundAnimal = () => (
    <View style={styles.foundContainer}>
      <Text style={styles.foundAnimal}>{getPrizeAnimal()}</Text>
      <Text style={styles.foundText}>Animal descoberto!</Text>
    </View>
  );

  const NotFoundAnimal = () => (
    <View>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setInput(text)}
            defaultValue={input}
          />
        </View>
        <Text style={styles.triesText}>{triesAvailable}/3</Text>
      </View>
      {buttonTry}
    </View>
  );

  return (
    <View style={styles.overlayContainer}>
      <TouchableHighlight
        style={styles.closeOverlayIcon}
        onPress={() => closeOverlay()}
        underlayColor="transparent"
      >
        <Ionicons name="md-close" size={50} color="white" />
      </TouchableHighlight>
      <View style={styles.prizeAnimalCard}>
        <AntDesign
          name="staro"
          style={styles.starIcon}
          color="#e5c100"
          size={22}
        />
        <Text style={styles.prizeTitle}>Animal Premiado</Text>
        <View style={styles.hintsContainer}>{displayHints}</View>
        {foundPrizeAnimal ? <FoundAnimal /> : <NotFoundAnimal />}
        {displayInstructions}
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
  prizeAnimalCard: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#fcfcfc",
    paddingTop: 5,
    paddingLeft: 12,
    paddingRight: 12,
  },
  starIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  prizeTitle: {
    fontFamily: "Montserrat-bold",
    fontSize: 25,
    color: "#e5c100",
    marginBottom: 10,
  },
  hintsContainer: {
    borderColor: "black",
    borderStyle: "dotted",
    opacity: 0.8,
    marginBottom: 10,
  },
  hintText: {
    fontFamily: "Montserrat-regular",
  },
  rowContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#0e0e0e",
    opacity: 0.8,
    flexGrow: 1,
    marginBottom: 10,
  },
  triesText: {
    alignSelf: "center",
    marginLeft: 4,
    fontFamily: "Montserrat-light",
    fontSize: 12,
  },
  instructionContainer: {
    paddingTop: 10,
    marginBottom: 10,
  },
  instructionText: {
    fontFamily: "Montserrat-light",
    fontSize: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#7CAA4B",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Montserrat-bold",
    color: "white",
    fontSize: 14,
  },
  foundContainer: {
    marginBottom: 10,
  },
  foundAnimal: {
    fontFamily: "Montserrat-bold",
    fontSize: 20,
    color: "#7CAA4B",
  },
  foundText: {
    fontFamily: "Montserrat-light",
    fontSize: 10,
  },
});
