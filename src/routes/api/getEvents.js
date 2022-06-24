module.exports.register = async server=> {
    server.route({
        method:"GET",
        path:"/api/events",
        config:{
            handler : async request => {
                try {
                    // get sql client registered as plugin 
                    const db = request.server.plugins.sql.client

                    // todo get current auth use id 
                    const userId = 'user1234'

                    // execute the query 
                    const res = await db.events.getEvents(userId)

                    // return recordset object
                    return res.recordset
                } catch (error) {
                    console.log(error)
                }
            }
        }
    });
}