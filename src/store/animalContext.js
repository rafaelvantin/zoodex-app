import React, { createContext, useEffect, useState } from "react";

import { searchAllAnimals } from "../services/animals";

export const AnimalContext = createContext([]);

export const AnimalStorage = ({ children }) => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    setAnimals([
      { key: "3" },
      {
        key: "4",
        name: "Macaco-prego",
        scientificName: "Sapajus",
        habitat: "Floresta Amazônica",
        image:
          "https://s2.glbimg.com/50Idnx6C06sgR4s-S7sodZ0tkQk=/290x217/s2.glbimg.com/29x2zOKPeF5SzbRqEPtHxSAeND8=/300x225/s.glbimg.com/jo/g1/f/original/2016/11/29/img_3706.jpg",
      },
      {
        key: "5",
        name: "Tigre de Sumatra",
        scientificName: "Panthera tigris sumatrae",
        habitat: "Floresta Montanhosa",
        image:
          "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
      },
      { key: "6" },
      { key: "7" },
      { key: "8" },
      { key: "9" },
      { key: "10" },
      { key: "11" },
      { key: "12" },
      { key: "13" },
    ]);
    // searchAllAnimals()
    //   .then((res) => setAnimals(res))
    //   .catch((error) => console.error(error));
  }, []);

  const fetchAnimals = () => {
    searchAllAnimals()
      .then((res) => setAnimals(res))
      .catch((error) => console.error(error));
  };

  return (
    <AnimalContext.Provider value={{ animals, fetchAnimals }}>
      {children}
    </AnimalContext.Provider>
  );
};
