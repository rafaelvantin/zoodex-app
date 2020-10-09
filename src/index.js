import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { AnimalStorage } from "./store/animalContext.js";
import { UserStorage } from "./store/userContext.js";
import { FeatureStorage } from "./store/featureContext.js";
import { ZooStorage } from "./store/zooContext.js";

import { AppLoading } from "expo";
import * as Font from "expo-font";

import Routes from "./routes/index.js";

import "./config/StatusBar.js";

const fetchFont = () => {
  return Font.loadAsync({
    "Montserrat-regular": require("../assets/fonts/MontserratAlternates-Regular.ttf"),
    "Montserrat-light": require("../assets/fonts/MontserratAlternates-Light.ttf"),
    "Montserrat-bold": require("../assets/fonts/MontserratAlternates-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <NavigationContainer>
      <ZooStorage>
        <UserStorage>
          <AnimalStorage>
            <FeatureStorage>
              <Routes />
            </FeatureStorage>
          </AnimalStorage>
        </UserStorage>
      </ZooStorage>
    </NavigationContainer>
  );
}
