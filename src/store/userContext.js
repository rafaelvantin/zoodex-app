import React, { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-community/async-storage";

import "react-native-get-random-values";
import { v4 } from "uuid";

import { searchZoo } from "../services/zoo";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [getUserID, setUserID] = useState("");
  const [getUsername, setUsername] = useState("");
  const [foundAnimals, setFoundAnimals] = useState([]);
  const [zooInfo, setZooInfo] = useState({});
  const [activeZoo, setActiveZoo] = useState("");

  useEffect(() => {
    async function loadStorage() {
      const storedActiveZoo = await AsyncStorage.getItem("@activeZoo");
      const storedFoundAnimals = await AsyncStorage.getItem("@foundAnimals");
      const storedName = await AsyncStorage.getItem("@username");
      const storedID = await AsyncStorage.getItem("@userID");

      if (storedActiveZoo) setActiveZoo(storedActiveZoo);
      if (storedFoundAnimals) setFoundAnimals(JSON.parse(storedFoundAnimals));
      if (storedName) setUsername(storedName);
      if (storedID) setUserID(storedID);
    }
    loadStorage();
    leaveZoo();

    // if (activeZoo) {
    //   searchZoo
    //     .then((zoo) => setZooInfo(zoo))
    //     .catch((error) => console.log(error));
    // }
  }, []);

  const saveFoundAnimal = async (id) => {
    if (!foundAnimals.includes(id)) {
      setFoundAnimals([...foundAnimals, id]);
      await AsyncStorage.setItem("@foundAnimals", JSON.stringify(foundAnimals));
    }
  };

  const saveUsername = async (name) => {
    setUsername(name);
    await AsyncStorage.setItem("@username", name);
    // if (getUserID != "") return;
    console.log(v4);
    console.log(v4());
    const generatedID = v4();
    console.log(generatedID);
    setUserID(generatedID);
    await AsyncStorage.setItem("@userID", getUserID);
  };

  const saveActiveZoo = async (id) => {
    setActiveZoo(id);
    await AsyncStorage.setItem("@activeZoo", id);
  };

  const getAdditionalInfo = () => zooInfo.additionalInfo;

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
        saveFoundAnimal,
        getUserID,
        getUsername,
        saveUsername,
        activeZoo,
        saveActiveZoo,
        getAdditionalInfo,
        leaveZoo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
