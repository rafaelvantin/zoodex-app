import React, { createContext, useEffect, useState, useContext } from "react";

import AsyncStorage from "@react-native-community/async-storage";

import { searchAllAnimals, capturedAnimal } from "../services/animals";

import { ZooContext } from "./zooContext";

export const AnimalContext = createContext([]);

export const AnimalStorage = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [foundAnimals, setFoundAnimals] = useState({});
  const [updated, setUpdated] = useState(false);

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
        capturedAnimal(id, activeZoo).then(async () => {
          newFoundAnimals = foundAnimals;
          newFoundAnimals[activeZoo].push(id);
          setFoundAnimals(newFoundAnimals);
          setUpdated(!updated);
          await AsyncStorage.setItem("@foundAnimals", JSON.stringify(newFoundAnimals));
        }).catch(() => reject());
        
        resolve();
      }
      else{
        reject();
      }
      
    });
  };

  return (
    <AnimalContext.Provider value={{ animals, foundAnimals, getThisFoundAnimals, fetchAnimals, saveFoundAnimal, updated }}>
      {children}
    </AnimalContext.Provider>
  );
};
