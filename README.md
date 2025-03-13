# Prueba Tecnica Servidores
 Aplicación de gestión de servidores creada en Angular que permite monitorear y administrar información básica de servidores

Este proyecto permite gestionar servidores (crear, editar, eliminar y ver detalles), así como manejar la autenticación de usuarios (registro e inicio de sesión). Está compuesto por dos partes principales:

1. **Backend**: Node.js + Express + MySQL  
2. **Frontend**: Angular + Bootstrap

---

## 1. Requisitos Previos

- **Node.js** (v14 en adelante)
- **Angular CLI** (versión 15+)
- **MySQL** (puede ser instalado localmente o usando XAMPP, WAMP, etc.)
- **Navegador Web** (Chrome, Firefox, Edge, etc.)

---

## 2. Configuración del Backend (Node.js)

1. **Clona o descarga** este repositorio.
2. Ubícate en la carpeta del backend:
   ```
   cd backend

## Instala las dependencias:

npm install


# Configura tu base de datos en MySQL:

## Crea una base de datos, por ejemplo, servers_db.
Asegúrate de que las tablas users y servers estén definidas según tus necesidades. Puedes utilizar el siguiente SQL para crearlas:

 CREATE TABLE users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL
 );

 CREATE TABLE servers (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   os VARCHAR(255) NOT NULL,
   ram INT NOT NULL,
   disk_capacity VARCHAR(255) NOT NULL,
   ip_address VARCHAR(255) NOT NULL,
   status VARCHAR(255) NOT NULL
 );

## Crea un archivo .env en la raíz del backend y añade:

 PORT=3030
 DB_HOST=localhost
 DB_USER=root
 DB_PASSWORD=
 DB_NAME=servers_db
 JWT_SECRET=un_secreto_seguro

## Ejecuta el servidor:

  npm start

## El servidor se iniciará en http://localhost:3030 (o en el puerto definido en el archivo .env).

# 3. Configuración del Frontend (Angular)
Desde la raíz del proyecto, ubícate en la carpeta del frontend:

  cd front-end

## Instala las dependencias:

  npm install

## Instala Bootstrap:

  npm install bootstrap

## Luego, abre angular.json y en la sección "styles" agrega:


  "styles": [
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "src/styles.css"
  ]
  
## Configura la URL del backend en los servicios. Abre los archivos:

src/app/services/auth.service.ts y asegúrate de que:

private apiUrl = 'http://localhost:3030/api/auth';

src/app/services/server.service.ts y asegúrate de que:

private apiUrl = 'http://localhost:3030/api/servers';

## Inicia la aplicación:

ng serve --open

La aplicación se abrirá en http://localhost:4200 por defecto.
