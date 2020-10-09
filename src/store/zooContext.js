import React, { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-community/async-storage";

import { searchZoo } from "../services/zoo";

export const ZooContext = createContext([]);

export const ZooStorage = ({ children }) => {
  const [zooInfo, setZooInfo] = useState({});
  const [foundZoos, setFoundZoos] = useState([]);
  const [activeZoo, setActiveZoo] = useState("");

  useEffect(() => {
    async function loadStorage() {
      const storedActiveZoo = await AsyncStorage.getItem("@activeZoo");
      const storedFoundZoos = await AsyncStorage.getItem("@foundZoos");

      if (storedActiveZoo) setActiveZoo(storedActiveZoo);
      if (storedFoundZoos) setFoundZoos(JSON.parse(storedFoundZoos));
    }
    loadStorage();
    // fetchZooInfo(activeZoo);
  }, []);

  useEffect(() => {
    if (activeZoo != "") (async () => setZooInfo(fetchZooInfo(activeZoo)))();
  }, [activeZoo]);

  const saveActiveZoo = async (id) => {
    setActiveZoo(id);
    await AsyncStorage.setItem("@activeZoo", id);
  };

  const saveNewZoo = async (id) => {
    setFoundZoos([...foundZoos, id]);
    await AsyncStorage.setItem("@foundZoos", JSON.stringify(foundZoos));
  };

  const fetchZooInfo = async (id) => {
    try {
      const zoo = await searchZoo(id);
      return zoo;
    } catch {
      return null;
    }
  };

  const getAdditionalInfo = () => zooInfo.additionalInfo;

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
        getAdditionalInfo,
      }}
    >
      {children}
    </ZooContext.Provider>
  );
};
