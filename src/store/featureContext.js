import React, { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-community/async-storage";

export const FeatureContext = createContext();

export const FeatureStorage = ({ children }) => {
  const [triesAvailable, setTriesAvailable] = useState("3");
  const [foundPrizeAnimal, setFoundPrizeAnimal] = useState(false);

  useEffect(() => {
    async function loadStorage() {
      const storedTriesAvailable = await AsyncStorage.getItem(
        "@triesAvailable"
      );
      const storedFoundPrizeAnimal = await AsyncStorage.getItem(
        "@foundPrizeAnimal"
      );

      if (storedTriesAvailable) setTriesAvailable(storedTriesAvailable);
      if (storedFoundPrizeAnimal) setFoundPrizeAnimal(storedFoundPrizeAnimal);
    }
    loadStorage();
  }, []);

  const saveTriesAvailable = async (triesRemaining) => {
    setTriesAvailable(triesRemaining);
    await AsyncStorage.setItem("@triesAvailable", triesRemaining.toString());
  };

  const saveFoundPrizeAnimal = async () => {
    setFoundPrizeAnimal(true);
    await AsyncStorage.setItem("@foundPrizeAnimal", "true");
  };

  const getPrizeAnimal = () => "Tigre de Sumatra";

  return (
    <FeatureContext.Provider
      value={{
        triesAvailable,
        saveTriesAvailable,
        getPrizeAnimal,
        foundPrizeAnimal,
        saveFoundPrizeAnimal,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};
