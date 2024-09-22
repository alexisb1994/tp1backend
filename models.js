import { existsSync, read, readFileSync, writeFileSync } from "node:fs";
// import { randomUUID } from "node:crypto";
// Averiguar que importar de NODE para realizar el hash del pass
// Averiguar como "activar" la lectura de las variables de entorno del archivo .env (dotenv)
import { handleError } from "./utils/handleError.js";
// import { type } from "node:os";
import dotenv from 'dotenv';
import { randomUUID, createHash } from "node:crypto";
// 1° recuperar variables de entorno

// 2° Declarar los metodos

dotenv.config();

const PATH_FILE_USERS = process.env.PATH_FILE_USERS;

const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

// console.log(`PATH_FILE_USERS: ${PATH_FILE_USERS}`);


const getUsers = (PATH_FILE_USERS) => {

  try {
    if (!PATH_FILE_USERS) {
      throw new Error("Access denied ");
    }

    const exists = existsSync(PATH_FILE_USERS);

    if (!exists) {
      writeFileSync(PATH_FILE_USERS, JSON.stringify([]));
      return [];
    }
    const users = JSON.parse(readFileSync(PATH_FILE_USERS));
    return users;

  } catch (error) {

    const objError = handleError(error, PATH_FILE_ERROR)
    return objError;
    // const objError = handleError()
    // return objError;
  }
};
// const respuesta =getUsers(PATH_FILE_USERS);
// console.log(respuesta);

////////////////////////
const getUserById = (id) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
    }

    const users = getUsers(PATH_FILE_USERS);

    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new Error("user not found");
    }

    return user;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR)
    return objError;
  }
};
// console.log(getUserById(2));

///////////////////////////////////////////

// addUser recibe un objeto con toda la data para el nuevo usuario
// valida que esten los datos míminos para añadir un nuevo usuario
// valida que el nombre sea un string
// valida que el apellido sea un string
// valida que el email sea un string y que no se repita
// hashea la contraseña antes de registrar al usuario
const addUser = (userData) => {

  try {
    const { nombre, apellido, password, email } = userData;
    if (!nombre || !apellido || !password || !email) {
      throw new Error("Missing data")
    }
    if (typeof nombre !== 'string' || typeof apellido !== 'string' || typeof password !== 'string' || typeof email !== 'string') {
      throw new Error("Data invalid")
    }
    const users = getUsers(PATH_FILE_USERS);

    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      throw new Error("Email already exists");
    }
    const hash = createHash("sha256").update(password).digest("hex")

    /////
    const newUser = {
      id: randomUUID(),
      nombre,
      apellido,
      email,
      password: hash,
      isLoggedIn: false,

    };

    users.push(newUser);
    writeFileSync(PATH_FILE_USERS, JSON.stringify(users));

    return newUser;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};
////////////

const userData = {
  nombre: "a",
  apellido: "b",
  email: "jg12434@gmail.com",
  password: "1234"
}
// const respuesta = addUser(userData);
// console.log(respuesta);


// todos los datos del usuario seleccionado se podrían modificar menos el ID
// si se modifica la pass debería ser nuevamente hasheada
// si se modifica el email, validar que este no exista
const updateUser = (id, userData) => {
  try {
    const { nombre, apellido, password, email } = userData;

    if (!id || !userData) {
      throw new Error("ID is missing");
    }
    const users = getUsers(PATH_FILE_USERS);
    const user = users.find(user=> user.id === id)
    
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      throw new Error("Email already exists");
    }
    const hash = createHash("sha256").update(password).digest("hex")


   

    if (!user) {
      throw new Error("user not found");
    }

    if (nombre) user.nombre = nombre;
    if (apellido) user.apellido = apellido;
    if (email) user.email = email;
    if (password) user.password = hash;

    writeFileSync(PATH_FILE_USERS, JSON.stringify(users));

    return user;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR)
    return objError;
  }

};
const userToUpdate = {
  
  nombre: "EMPANADAS",
  apellido: "b",
  email: "EMPANADA@gmail.com",
  password: "ale",
  isLoggedIn: false

};


const respuesta = updateUser("d543b421-bc98-478b-8d9a-ad7286b970aa",userToUpdate);

console.log(respuesta);
///////////////
// const updateUser = (id, userData) => {
//   try {
//     const { nombre, apellido, password, email } = userData;

//     if (!id || !userData) {
//       throw new Error("ID or userData is missing");
//     }

//     // Obtiene la lista de usuarios
//     const users = getUsers(PATH_FILE_USERS);

//     // Verifica si el email ya existe, pero ignora el del usuario actual que estás actualizando
//     const emailExists = users.some(user => user.email === email && user.id !== id);
//     if (emailExists) {
//       throw new Error("Email already exists");
//     }

//     // Busca el índice del usuario en el arreglo
//     const user = getUserById(id);
//     if (!user) {
//           throw new Error("user not found");
//            }
    
//            // Si se pasa un password, lo hashea antes de actualizarlo
//     const hash = password ? createHash("sha256").update(password).digest("hex") : users[index].password;

//     // Actualiza las propiedades del usuario en el arreglo de usuarios
//     if (nombre) users.nombre = nombre;
//     if (apellido) users.apellido = apellido;
//     if (email) users.email = email;
//     if (password) users.password = hash;

//     // Guarda los cambios en el archivo
//     writeFileSync(PATH_FILE_USERS, JSON.stringify(users));

//     // Retorna el usuario actualizado
//     return users[index];

//   } catch (error) {
//     const objError = handleError(error, PATH_FILE_ERROR);
//     return objError;
//   }
// };
/////////////


const deleteUser = (id) => {

  try {
    
  if (!id) {
    throw new Error("ID is missing");
  }

  const users=getUsers(PATH_FILE_USERS);
  const user = getUserById(id);

  const newUser= users.filter((user) => user.id !==id); 
writeFileSync(PATH_FILE_USERS,JSON.stringify(newUser));

return user;
  } catch (error) { 
    const objError = handleError(error, PATH_FILE_ERROR)
    return objError;
  }
};

// const respuesta =deleteUser("0c4bb24b-84e8-48e6-bb13-e56c9baba074");

// console.log(respuesta);


export { getUsers, getUserById, addUser, updateUser, deleteUser };
