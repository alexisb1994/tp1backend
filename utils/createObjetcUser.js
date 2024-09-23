// 1° objetener los argumentos pasador por terminal (que vienen del index)
// 2° desarrollar las funciones que crean los objetos para añadir un usario y actualizar un usuario
// 3° aplicar control de errores entorno a las posibilidades de que surja uno

const createUserObject = (args) => {
    return{
      nombre:args[1],
      apellido:args[2],
      email:args[3],
      password:args[4],    
      };
    
};

const createUpdateUserObject = (args) => {
     return{
      nombre:args[2],
      apellido:args[3],
      email:args[4],
      password:args[5],    
      };
 };

export { createUserObject, createUpdateUserObject };
