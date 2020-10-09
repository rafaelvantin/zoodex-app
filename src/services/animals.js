import $api from "./api";

const searchAnimalById = (id, zooId) => {
  return new Promise((resolve, reject) => {
    $api
      .get(`/animals/${id}`, { headers: { zoo_id: zooId } })
      .catch((error) => console.error(error))
      .then(({ data }) => resolve(data.animal));
  });
};

const searchAllAnimals = async (id) => {
  return new Promise((resolve, reject) => {
    $api
      .get("/animals", { headers: { zoo_id: id } })
      .catch((error) => reject(error))
      .then(({ data }) => resolve(data));
  });
};

export { searchAllAnimals, searchAnimalById };
