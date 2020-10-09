import $api from "./api";

const searchZoo = (id) => {
  return new Promise((resolve, reject) => {
    $api
      .get(`/zoo/${id}`)
      .catch((error) => reject(error))
      .then(({ data }) => resolve(data[0]));
  });
};

export { searchZoo };
