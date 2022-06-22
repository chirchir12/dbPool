"use strict";

const assert = require('assert');
const dotenv = require('dotenv');

// read the .env
dotenv.config()

// capture all the environment variables tha app needs 
const {
    HOST,
    PORT,
    HOST_URL,
    COOKIE_ENCRYPT_PWD,
    SQL_USER,
    SQL_PASSWORD,
    SQL_DATABASE,
    SQL_SERVER,
    SQL_ENCRYPT

} = process.env

// check if we need to encrpyt the database
const sqlEncrpt = process.env.SQL_ENCRYPT === 'true'

// validate the required configuration information
assert(PORT, 'PORT configuration is required');
assert(HOST, 'HOST configuration is required');
assert(HOST_URL, 'HOST_URL configuration is required');
assert(COOKIE_ENCRYPT_PWD, 'COOKIE_ENCRYPT_PWD configuration is required');
assert(SQL_USER, 'SQL_USER configuration is required');
assert(SQL_PASSWORD, 'SQL_PASSWORD configuration is required');
assert(SQL_DATABASE, 'SQL_DATABASE configuration is required');
assert(SQL_SERVER, 'SQL_SERVER configuration is required');
assert(SQL_ENCRYPT, 'SQL_ENCRYPT configuration is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    cookiePwd: COOKIE_ENCRYPT_PWD,
    sql: {
        server:SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password:SQL_PASSWORD,
        options: {
            encrypt:sqlEncrpt
        }
    }
}
