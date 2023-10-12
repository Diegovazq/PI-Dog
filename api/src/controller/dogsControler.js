require("dotenv").config();
const axios= require ("axios");
const {Dog,Temperament} =require("../db");
const { API_KEY}=process.env;

// Obtiene la lista de perros de la API externa
const getDogsApi = async () => {    
    try {
        const api = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const allDogs = api.data?.map(dog => ({
        
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                weightMin: parseInt(dog.weight.metric.split("-")[0]),
                weightMax: parseInt(dog.weight.metric.split("-")[1]),
                height: parseInt(dog.height.metric.split("-")[0]),
                averageWeight: parseInt(dog.weight.metric.split("-")[1]),
                life_span: parseInt(dog.life_span.split("-")[0]),
                temperament: dog.temperament,
                from: "API"
            
        }));
        return allDogs;
    } catch (error) {
        console.log("error:",error);
      throw new Error("Error fetching data from the external API");
    }
  };
  

  // Obtiene la lista completa de perros (API + Base de Datos)
const getAllDogs = async () => {
  
    try {
        const allDogsApi = await getDogsApi();
        const allDogsDb = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
        const allDogsDbWithTemps = allDogsDb.map(dog => ({
           
                id: dog.id,
                name: dog.name,
                image: dog.image,
                weightMin: dog.weightMin,
                weightMax: dog.weightMax,
                height: dog.height,
                averageWeight: dog.averageWeight,
                life_span: dog. life_span,
                temperament: dog.temperament.map((temp) => temp.name).join(', '),
                from: dog.from
            }));
            return [...allDogsApi, ...allDogsDbWithTemps];
          } catch (error) {
            console.log("error:",error);
            throw new Error("Error fetching data from the database");
          }
        };


     const getDogsByName = async (name) => {
        try {
            if (!name) {
              throw new Error("Name is required for searching");
            }
        
            const allDogs = await getAllDogs();
            const filterName = allDogs.filter((dog) =>
              dog.name.toLowerCase().includes(name.toLowerCase())
            );
        
            if (filterName.length > 0) {
              return filterName;
            } else {
              throw new Error(`Dog not found: ${name}`);
            }
          } catch (error) {
            throw new Error(`Error fetching dog by name: ${error.message}`);
          }
        };

const getDogByID = async (id) => {
 
        const allDogs = await getAllDogs();
        const filterName = allDogs.filter((dog) => dog.id == id);
        if (filterName.length > 0) {
            return filterName[0];
        } else {
            throw new Error(`ID dog not found, ID = ${id}`);
        }

};

const createNewDog = async (
    name,
    image,
    weightMin,
    weightMax,
    height,
    life_span,
    temperament,
    from_DB
  ) => {
    try {
      // Verificar si el perro ya existe
      const existingDog = await Dog.findOne({ where: { name: name } });
      if (existingDog) {
        throw new Error(`El perro "${name}" ya existe.`);
      }
  
      // Calcular averageWeight si weightMin y weightMax se proporcionan
      const averageWeight = weightMin && weightMax ? (weightMin + weightMax) / 2 : null;
  
      // Crear el nuevo perro
      const newDog = await Dog.create({
        name: name,
        image: image,
        weightMin: weightMin,
        weightMax: weightMax,
        height: height,
        averageWeight: averageWeight,
        life_span: life_span,
        from: from_DB,
      });
  
      // Obtener o crear el temperamento y asociarlo al perro
      const [temperamentInstance] = await Temperament.findOrCreate({
        where: { name: temperament },
      });
      await newDog.addTemperament(temperamentInstance);
  
      return newDog;
    } catch (error) {
      throw new Error(`Error al crear el perro: ${error.message}`);
    }
  };
  
const deleteDog = async (id) => {

        const delDog = await Dog.destroy({
            where: {
                id,
            }
        })
        return delDog;

}

module.exports = {
    getDogsByName,
    getDogByID,
    getAllDogs,
    createNewDog,
    deleteDog,
    }