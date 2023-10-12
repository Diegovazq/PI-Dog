const {  getDogsByName,
    getDogByID,
    getAllDogs,
    createNewDog,
    deleteDog,
    
  } = require("../controller/dogsControler");

    const getAllDogsHandler = async (req, res) => {
      
        try {
            let result = await getAllDogs();
          
            return res.status(200).json(result);
          
        } catch (error) {
          res.status(404).json({ error: error.message });
        }
      };

      
const getDogByNameHandler = async (req, res) => {
  const { name } = req.params;
  try { 
    if (!name) {
      // Si no se proporciona un nombre, devolvemos un error
      throw new Error("Name is required for searching");
    }
    let result = await getDogsByName(name);
    return res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
      
const getDogByIDHandler = async (req, res) => {
    const { idRaza } = req.params;
    let origin= isNaN(idRaza) ? "db" : "api";
    try {
      let result = await getDogByID(idRaza, origin);
      if(result.error) throw new Error(result.error);
      // la función recibe por parámetro el id de la raza y el origen
      // responde con 200 el result
      return res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const createNewDogHandler = async (req, res) => {
    let { 
      name,
      image,
      weightMin,
       weightMax,
        height,
         life_span,
          averageWeight,
          temperament,
           from_DB} =
      req.body;
    try {
      // espera los datos
      await createNewDog(
        name,
        image,
        weightMin,
         weightMax,
          height,
           life_span,
             averageWeight,
             temperament);
      res.status(200).send("Nuevo perro creado perfectamente");
      // si todo salió bien 200 OK
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
const deleteDogHandler =  async (req, res) => {
    try {
        const { id } = req.params;
        const delDog = await deleteDog(id);
        res.status(200).json({ message: `Removed dog ID ${id}` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



  module.exports = {
    getAllDogsHandler,
    getDogByNameHandler,
    getDogByIDHandler,
    createNewDogHandler,
    deleteDogHandler, 
  
  };
  