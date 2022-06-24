"use strict";

const events = require('./events');
const sql = require('mssql');

const client = async (server, config)=> {
    let pool = null; 

    const closePool = async ()=> {
        try {
            // try to close connection to the pool
            await pool.close()

            // set pool to null to ensure creation of a new one
            pool = null;



        } catch (error) {
            // error closing the connection
            // a new connection will be created by get connection
            pool = null; 
            server.log(['error', 'data'], 'closePool error')
            server.log(['error', 'data'], error)
        }
    }

    const getConnection = async ()=> {
        try {
            if (pool) {
                // connection is there already.
                // return the connection 
                return pool;
            }

            // create new connection 
            pool = await sql.connect(config);
            pool.on('error', async err=> {
                server.log(["error", "data"], "connection pool error");
                server.log(["error", "data"], err)
                await closePool();
            })
            return pool
        } catch (error) {
            // error connection to sql
            server.log(['error', "data"], 'connection pool error');
            server.log(['error', 'data'], error)
            pool= null
        }
    }

    // expore the api to the rest of the application
    return {
        events: await events.register({sql, getConnection})
    }
}

module.exports = client