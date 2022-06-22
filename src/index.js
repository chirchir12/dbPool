"use strict";

const server = require('./server')

const startServer = async ()=> {
    try {
        // todo move config to separate config file
        let config = {
            host: "localhost",
            port: 8080
        }

        // create instance of the server application 
        const app = await server(config)

        // start the web server 
        await app.start();

        console.log(`server running at http://${config.host}:${config.port}...`);
    } catch (error) {
        console.log("startup error", error)
    }
}

startServer();
