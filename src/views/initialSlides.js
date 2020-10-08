import React, { useState, useContext } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";

import { UserContext } from "../store/userContext";

import { FontAwesome } from "@expo/vector-icons";

import LottieView from "lottie-react-native";

export default function InitialSlides({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const { saveUsername } = useContext(UserContext);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const numSlides = [0, 1, 2, 3];

  const WelcomeTab = () => {
    return (
      <View style={{ backgroundColor: "white", width, height }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/nature1.png")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Bem Vindo.</Text>
          <Text style={styles.text}>
            O aplicativo Zoodex foca em tornar sua visita ao zoológico mais
            divertida, permitindo o acesso a dados dos animais e do zoológico de
            maneira interativa.
          </Text>
        </View>
      </View>
    );
  };

  const ScanTab = () => {
    return (
      <View style={{ backgroundColor: "white", width, height }}>
        <View style={styles.imageContainer}>
          <LottieView
            source={require("../../assets/qr-scan.json")}
            autoPlay
            loop
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Como Usar.</Text>
          <Text style={styles.text}>
            Use a câmera do seu celular para scannear o código QR da placa dos
            animais para adicionar ele na sua coleção.
          </Text>
        </View>
      </View>
    );
  };

  const ChatTab = () => {
    return (
      <View style={{ backgroundColor: "white", width, height }}>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.image, { height: "96%" }]}
            source={require("../../assets/chat.png")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Use o chat.</Text>
          <Text style={styles.text}>
            O chat do aplicativo é divido entre os usuários que estão logados
            naquele zoológico.
          </Text>
        </View>
      </View>
    );
  };

  const DataTab = () => {
    return (
      <KeyboardAvoidingView
        style={{ backgroundColor: "white", width, height }}
        behavior="padding"
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/user.png")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Nos conte seu nome.</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              maxLength={14}
              onChangeText={(text) => setInput(text)}
              value={input}
            />
          </View>
          {error != "" && <Text style={styles.error}>{error}</Text>}
        </View>
        <TouchableHighlight onPress={onSubmit} style={styles.button}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.buttonText}>PROSSEGUIR</Text>
            <FontAwesome name="arrow-circle-o-right" size={30} color="#fff" />
          </View>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  };

  const onScroll = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (currentSlide !== slide) setCurrentSlide(slide);
  };

  const onSubmit = () => {
    if (input.length < 3) {
      return setError("*Nome tem que conter mais que 3 caracteres.");
    }
    setError("");
    saveUsername(input);
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      >
        {WelcomeTab()}
        {ScanTab()}
        {ChatTab()}
        {DataTab()}
      </ScrollView>
      <View style={styles.pageIndex}>
        {numSlides.map((item, index) => (
          <Text
            key={index}
            style={
              index == currentSlide ? styles.activeText : styles.inactiveText
            }
          >
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
  },
  pageIndex: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    bottom: 5,
  },
  activeText: {
    color: "#0e0e0e",
  },
  inactiveText: {
    color: "#2a2a2a",
    opacity: 0.5,
  },
  imageContainer: {
    width: "100%",
    height: 280,
    marginTop: 80,
    alignItems: "center",
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  textContainer: {
    marginTop: 60,
    paddingLeft: 40,
    paddingRight: 40,
  },
  title: {
    marginBottom: 40,
    fontFamily: "Montserrat-bold",
    fontSize: 40,
  },
  text: {
    fontFamily: "Montserrat-light",
    fontSize: 20,
  },
  inputContainer: {
    height: 50,
    width: "95%",
    borderRadius: 20,
    borderColor: "#1e1e1e",
    borderWidth: 1,
    justifyContent: "center",
    paddingLeft: 20,
  },
  error: {
    color: "red",
    marginLeft: 10,
    fontSize: 12,
    fontFamily: "Montserrat-light",
  },
  button: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    height: 50,
    width: "95%",
    borderRadius: 20,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Montserrat-bold",
    fontSize: 20,
    color: "white",
    marginRight: 20,
  },
});
