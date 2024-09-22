// 1° recibir los argumentos pasados por la terminal
// 2° enviarselos a ./utils/createObjectUser (en caso de crear o actualizar el usuario)
// 3° evaluar que acción quiere realizar el usuario (list, search/get, add, update, delete)
// 4° DEVOLVER EL OUTPUT AL CLIENTE FINAL
import {getUsers, getUserById, addUser, updateUser, deleteUser}from "./models.js"

import dotenv from 'dotenv';
dotenv.config();

const PATH_FILE_USERS = process.env.PATH_FILE_USERS;

const args=process.argv.splice(2);
const action=args[0];

const createNewUser=(args)=>{ 
    return{
nombre:args[1],
apellido:args[2],
email:args[3],
password:args[4],    
};
};

const createUpdateUser=(args)=>{ 
    return{
nombre:args[2],
apellido:args[3],
email:args[4],
password:args[5],    
};
};


switch(action){
case "list":
 console.log(getUsers(PATH_FILE_USERS));
 break;


case "add":
const newUser=createNewUser(args);
console.log(addUser(newUser));
break;

case "update":
console.log(updateUser(args[1],createUpdateUser(args)));

break; 

default:
    console.log("commant invalid..");
    break;
}

