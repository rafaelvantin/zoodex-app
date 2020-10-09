import axios from "axios";

import AsyncStorage from "@react-native-community/async-storage";

const api = axios.create({
  baseURL: "https://zoodexapi.herokuapp.com/",
  // withCredentials: false,
});

// api.interceptors.request.use(async (config) => {
//   config.headers.zoo_id = await AsyncStorage.getItem("@activeZoo");
//   return config;
// });

export default api;
