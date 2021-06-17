const http = require("http");
const app = require("./app");

// get port through environment variable or hardcode 
const port = process.env.PORT || 8000;

// create server and add listener 
const server = http.createServer(app);

server.listen(port);