import React, { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-community/async-storage";

import { searchZoo } from "../services/zoo";

export const ZooContext = createContext([]);

export const ZooStorage = ({ children }) => {
  const [zooInfo, setZooInfo] = useState({});
  const [foundZoos, setFoundZoos] = useState([]);
  const [activeZoo, setActiveZoo] = useState("");

  const validateActiveZoo = async () => {
    if (activeZoo){
      const fetchedZoo = await searchZoo(activeZoo);
      console.log(fetchedZoo);
      fetchedZoo != undefined ? setZooInfo(fetchedZoo) : deleteFoundZoo(activeZoo);
    }
  }

  useEffect(() => {
    async function loadStorage() {
      const storedActiveZoo = await AsyncStorage.getItem("@activeZoo");
      AsyncStorage.getItem("@foundZoo").then((storedFoundZoos) => storedFoundZoos != null && setFoundZoos(JSON.parse(storedFoundZoos)));
      if (storedActiveZoo) setActiveZoo(storedActiveZoo);
    }
    loadStorage();
    validateActiveZoo();    
  }, []);

  useEffect(() => {
    validateActiveZoo();
  }, [activeZoo]);

  const saveActiveZoo = async (id) => {
    setActiveZoo(id);
    await AsyncStorage.setItem("@activeZoo", id);
  };

  const saveNewZoo = async (id) => {
    if(!foundZoos.includes(id)){
      setFoundZoos([...foundZoos, id]);
      const newFoundZoos = [...foundZoos, id];
      await AsyncStorage.setItem("@foundZoo", JSON.stringify(newFoundZoos));
    }
  };

  const deleteFoundZoo = async (id) => {
    if(foundZoos.includes(id)){
      const newFoundZoos = foundZoos.filter((item) => item != id);
      setFoundZoos(newFoundZoos);
      await AsyncStorage.setItem("@foundZoo", JSON.stringify(newFoundZoos));
      saveActiveZoo("");
    }
  };

  const fetchZooInfo = async (id) => {
    try {
      return await searchZoo(id);
    } catch {
      return null;
    }
  };

  const leaveZoo = async () => {
    await AsyncStorage.removeItem("@activeZoo");
    setActiveZoo("");
  };

  return (
    <ZooContext.Provider
      value={{
        foundZoos,
        saveNewZoo,
        activeZoo,
        saveActiveZoo,
        zooInfo,
        fetchZooInfo,
        leaveZoo,
      }}
    >
      {children}
    </ZooContext.Provider>
  );
};
