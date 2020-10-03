import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { AnimalStorage } from "./store/animalContext.js";
import { UserStorage } from "./store/userContext.js";

import Routes from "./routes/index.js";

import "./config/StatusBar.js";

export default function App() {
  return (
    <NavigationContainer>
      <UserStorage>
        <AnimalStorage>
          <Routes />
        </AnimalStorage>
      </UserStorage>
    </NavigationContainer>
  );
}
