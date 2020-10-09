import React, { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-community/async-storage";

import "react-native-get-random-values";
import { v4 } from "uuid";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [getUserID, setUserID] = useState("");
  const [getUsername, setUsername] = useState("");

  useEffect(() => {
    async function loadStorage() {
      const storedName = await AsyncStorage.getItem("@username");
      const storedID = await AsyncStorage.getItem("@userID");

      if (storedName) setUsername(storedName);
      if (storedID) setUserID(storedID);
    }
    loadStorage();
  }, []);

  const saveUsername = async (name) => {
    setUsername(name);
    await AsyncStorage.setItem("@username", name);
    const generatedID = v4();
    setUserID(generatedID);
    await AsyncStorage.setItem("@userID", getUserID);
  };

  return (
    <UserContext.Provider
      value={{
        getUserID,
        getUsername,
        saveUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
