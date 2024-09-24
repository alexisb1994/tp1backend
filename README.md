# Gestión de Usuarios

Este proyecto permite gestionar un sistema de usuarios, incluyendo operaciones para agregar, modificar, mostrar y eliminar usuarios. La información de los usuarios se almacena en un archivo JSON, y se implementa un sistema de manejo de errores para registrar cualquier problema que surja.

## Entidades y Propiedades

Cada usuario tiene las siguientes propiedades:

- **id**: Generado automáticamente en formato UUID.
- **nombre**: Cadena de texto.
- **apellido**: Cadena de texto.
- **email**: Cadena de texto (debe ser único).
- **password**: Cadena de texto, que debe ser hasheada (se recomienda usar bcrypt).
- **isLoggedIn**: Valor booleano que por defecto será `false`.

## Archivos

- Los datos de los usuarios se almacenan en `./data/users.json`.
- Los errores se registran en `./error/log.json`.

## Métodos

### 1.(LIST) Mostrar Usuarios 

Devuelve la lista de todos los usuarios almacenados en el archivo.

### 2.(LISTID) Mostrar Usuario por ID
Busca y devuelve un usuario específico por su ID.

### 3.(ADD) Agregar Usuario
Agrega un nuevo usuario, validando que el email no esté repetido y hasheando la contraseña antes de guardarla.

### 4.(UPDATE) Modificar Usuario
Permite modificar los datos de un usuario (nombre, apellido, email o password). El ID no puede cambiar y se debe hashear la nueva contraseña si es que se modifica.

### 5.(DELETE) Eliminar Usuario
Elimina un usuario específico por su ID.

## Validaciones

- Asegúrate de que todos los campos obligatorios estén presentes antes de agregar o modificar un usuario.
- El email debe ser único entre los usuarios.
- La contraseña no debe guardarse en texto plano, debe estar hasheada.

## Errores

Se implementa un sistema de manejo de errores donde, si ocurre algún problema (por ejemplo, usuario no encontrado, email duplicado, datos faltantes), el error se registrará en el archivo de logs.

