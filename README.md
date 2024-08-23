# Blog server

Api rest que realiza operaicones CRUD para aplicacion de un blog.

Forma parte del bootcamp Fullstack de la Universidad de Helsinki parte 3.

El comando "npm run dev" ejecuta la aplicacion y levanta un contenedor para la base de datos.

El comando "npm run test" levanta un contenedor para la base de datos test.

Necesita estas variables de entorno para funcionar:

PORT=3003

MONGO_URI=mongodb+srv://joeldario9912:WkGn4dW4kBmrXDmc@blog-server.rkhukm4.mongodb.net/?retryWrites=true&w=majority&appName=blog-server

MONGO_TEST_DB_CONTAINER_NAME=blog-db-test
MONGO_TEST_DB_USER=usuario
MONGO_TEST_DB_PASS=secreto
MONGO_INITDB_DATABASE=blogs
MONGO_TEST_DB_PORT=27017:27017
MONGO_TEST_CONN_STR=mongodb://usuario:secreto@0.0.0.0:27017
