"use strict";

const Hapi = require('hapi');
const routes = require('./routes');

const app = async config=> {
    const {host, port} = config;

    // create instance of hapi 
    const server = Hapi.server({host, port});
    // store config for later use 
    server.app.config = config;

    await routes.register(server)
    return server; 
}
module.exports = app