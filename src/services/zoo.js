import $api from "./api";

const searchZoo = (id) => {
  return new Promise((resolve, reject) => {
    $api
      .get(`/zoo/${id}`)
      .catch((error) => console.error(error))
      .then(({ data }) => resolve(data[0]));
  });
};

export { searchZoo };
