"use strict";
const apis = require('./api')

module.exports.register = async server => {
    // register api routes 
    const promises = apis.map(async(api)=> {
        return await api.register(server)
    })

    server.route({
        method:"GET",
        path:"/",
        "handler": async (request, h)=> {
            return 'my first hapi server'
        }
    })
    return Promise.all(promises)
}