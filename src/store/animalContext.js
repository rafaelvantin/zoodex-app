import React, { createContext, useEffect, useState, useContext } from "react";

import AsyncStorage from "@react-native-community/async-storage";

import { searchAllAnimals } from "../services/animals";

import { ZooContext } from "./zooContext";

export const AnimalContext = createContext([]);

export const AnimalStorage = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [foundAnimals, setFoundAnimals] = useState({});
  const [getThisFoundAnimals, setThisFoundAnimals] = useState([]);
  const { activeZoo } = useContext(ZooContext);

  const createObjectInstance = () => {
    const newFoundAnimals = foundAnimals;
    newFoundAnimals[activeZoo] = [];
    setFoundAnimals(newFoundAnimals);
  };

  useEffect(() => {
    async function loadStorage() {
      const storedFoundAnimals = await AsyncStorage.getItem("@foundAnimals");
      if (storedFoundAnimals) setFoundAnimals(JSON.parse(storedFoundAnimals));
      if (typeof foundAnimals[activeZoo] != "object") createObjectInstance();
    }
    if (activeZoo != "") {
      loadStorage();
      (async () => await fetchAnimals())();
    }
  }, [activeZoo]);

  useEffect(() => {
    if (activeZoo != "" && typeof foundAnimals[activeZoo] == "object") setThisFoundAnimals(foundAnimals[activeZoo]);
  }, [foundAnimals]);

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
        await AsyncStorage.setItem("@foundAnimals", JSON.stringify(foundAnimals));
        resolve();
      }

      reject();
    });
  };

  return (
    <AnimalContext.Provider value={{ animals, getThisFoundAnimals, fetchAnimals, saveFoundAnimal }}>
      {children}
    </AnimalContext.Provider>
  );
};
