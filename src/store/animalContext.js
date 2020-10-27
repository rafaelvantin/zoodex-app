import React, { createContext, useEffect, useState, useContext } from "react";

import AsyncStorage from "@react-native-community/async-storage";

import { searchAllAnimals } from "../services/animals";

import { ZooContext } from "./zooContext";

export const AnimalContext = createContext([]);

export const AnimalStorage = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [foundAnimals, setFoundAnimals] = useState({});
  const { activeZoo } = useContext(ZooContext);

  const createObjectInstance = () => {
    const newFoundAnimals = foundAnimals;
    newFoundAnimals[activeZoo] = [];
    setFoundAnimals(newFoundAnimals);
  };

  const getThisFoundAnimals = () => {
    if (activeZoo != "" && typeof foundAnimals[activeZoo] == "object") return foundAnimals[activeZoo];
    return null;
  }

  useEffect(() => {
    async function loadStorage() {
      AsyncStorage.getItem("@foundAnimals").then((value) => value != null && setFoundAnimals(JSON.parse(value)));
      if (typeof foundAnimals[activeZoo] != "object") createObjectInstance();
    }
    if (activeZoo != "") {
      loadStorage();
      (async () => await fetchAnimals())();
    }
  }, [activeZoo]);

  const fetchAnimals = async () => {
    try {
      const response = await searchAllAnimals(activeZoo);
      setAnimals(response);
    } catch (err) {
      console.log(err);
    }
  };

  const saveFoundAnimal = (id) => {
    return new Promise(async (resolve, reject) => {
      let newFoundAnimals = {};

      if (typeof foundAnimals[activeZoo] !== "object") createObjectInstance();

      if (!foundAnimals[activeZoo].includes(id)) {
        newFoundAnimals = foundAnimals;
        newFoundAnimals[activeZoo].push(id);
        setFoundAnimals(newFoundAnimals);
        // console.log("INSIDE SAVE FOUND ANIMAL");
        // console.log(newFoundAnimals);
        await AsyncStorage.setItem("@foundAnimals", JSON.stringify(newFoundAnimals));
        resolve();
      }

      reject();
    });
  };

  return (
    <AnimalContext.Provider value={{ animals, foundAnimals, getThisFoundAnimals, fetchAnimals, saveFoundAnimal }}>
      {children}
    </AnimalContext.Provider>
  );
};
