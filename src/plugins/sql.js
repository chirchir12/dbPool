"use strict";

// import the data access layer; 
const dataClient = require('../data')

module.exports = {
    name:"sql", 
    version:"1.0.0",
    register: async server => {
        // get the sql connections information 
        const config = server.app.config.sql;


        // create instanc of database client 
        const client = await dataClient(server, config)

        //export the client so it is available wherewhere server is available
        server.expose('client', client)
    }
}