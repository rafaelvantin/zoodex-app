import $api from "./api";

const searchAnimalById = (id, zooId) => {
  return new Promise((resolve, reject) => {
    $api
      .get(`/animals/${id}`, { headers: { zoo_id: zooId } })
      .catch((error) => reject(error))
      .then(({ data }) => resolve(data));
  });
};

const searchAllAnimals = (id) => {
  return new Promise((resolve, reject) => {
    $api
      .get("/animals", { headers: { zoo_id: id } })
      .catch((error) => reject(error))
      .then(({ data }) => resolve(data));
  });
};

const validateAnimal = (id, zooId) => {
  return new Promise((resolve, reject) => {
    $api
      .get(`/user/animal/${id}`, { headers: { zoo_id: zooId } })
      .catch((error) => reject(error))
      .then(() => resolve());
  });
};

export { searchAllAnimals, searchAnimalById, validateAnimal };
