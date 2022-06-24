module.exports.register = async server => {
    server.route({
        method:"POST",
        path:"/api/events/{id}",
        config:{
            handler : async request => {
                try {
                    // get sql client registered as plugin 
                    const db = request.server.plugins.sql.client

                    // todo get current auth use id 
                    const userId = 'user1234';
                    const id = request.params.id

                    const {
                        startDate,
                        startTime,
                        endDate,
                        endTime,
                        title,
                        description
                    } = request.payload


                    // execute the query 
                    const res = await db.events.updateEvent({userId, id, title, description, startDate, startTime, endDate, endTime})
                    return res.recordset[0]
                } catch (error) {
                    server.log(['error', 'api', 'events'], error)
                    console.log(error)
                    return error
                }
            }
        }
    })
}