import React, { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-community/async-storage";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [activeZoo, setActiveZoo] = useState("");
  const [foundAnimals, setFoundAnimals] = useState([]);

  useEffect(() => {
    async function loadStorage() {
      const storedActiveZoo = await AsyncStorage.getItem("@activeZoo");
      const storedFoundAnimals = await AsyncStorage.getItem("@foundAnimals");

      if (storedActiveZoo) setActiveZoo(storedActiveZoo);
      if (storedFoundAnimals) setFoundAnimals(JSON.parse(storedFoundAnimals));
    }
    loadStorage();
  }, []);

  const saveActiveZoo = async (id) => {
    setActiveZoo(id);
    await AsyncStorage.setItem("@activeZoo", id);
  };

  const saveFoundAnimal = async (id) => {
    if (!foundAnimals.includes(id)) {
      setFoundAnimals([...foundAnimals, id]);
      await AsyncStorage.setItem("@foundAnimals", JSON.stringify(foundAnimals));
    }
  };

  const leaveZoo = async () => {
    await AsyncStorage.removeItem("@foundAnimals");
    await AsyncStorage.removeItem("@activeZoo");
    setActiveZoo("");
    setFoundAnimals([]);
  };

  return (
    <UserContext.Provider
      value={{
        foundAnimals,
        activeZoo,
        saveActiveZoo,
        saveFoundAnimal,
        leaveZoo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
