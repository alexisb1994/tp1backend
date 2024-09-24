// 1° recibir los argumentos pasados por la terminal
// 2° enviarselos a ./utils/createObjectUser (en caso de crear o actualizar el usuario)
// 3° evaluar que acción quiere realizar el usuario (list, search/get, add, update, delete)
// 4° DEVOLVER EL OUTPUT AL CLIENTE FINAL
import {getUsers, getUserById, addUser, updateUser, deleteUser}from "./models.js"

import { createUserObject } from "./utils/createObjetcUser.js";
import { createUpdateUserObject } from "./utils/createObjetcUser.js";

import dotenv from 'dotenv';
dotenv.config();

const PATH_FILE_USERS = process.env.PATH_FILE_USERS;

const args=process.argv.splice(2);
const action=args[0];



switch(action){
case "list":
 console.log(getUsers(PATH_FILE_USERS));
 break;

 case "listId":
 console.log(getUserById(args[1]));
 break;

case "add":
const newUser=createUserObject(args);
console.log(addUser(newUser));
break;

case "update":
console.log(updateUser(args[1],createUpdateUserObject(args)));
break; 

case "delete":
    console.log(deleteUser(args[1]));
    break;
default:
    console.log("commant invalid..");
    break;
}

