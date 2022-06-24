"use strict";

const utils = require('../utils');

const register = async ({sql, getConnection})=> {
    // read all sql files in the folder 
    const sqlQueries = await utils.loadSqlQueries('events');

    const getEvents = async userId => {
        // get connection to  SQL sever 
        const cnx = await getConnection();

        // create new request
        const request = await cnx.request()

       // configure sql query params 
       request.input("userId", sql.VarChar(50), userId)

       // return the executed query 
       return request.query(sqlQueries.getEvents);

    }

    //todo move this to its onw file : addEvent
    const addEvent = async({
        userId,
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime
    })=> {
        const pool = await getConnection();
        const request = await pool.request();
        console.log(startTime)

        // pass input 
        request.input('userId', sql.VarChar(50), userId);
        request.input('title', sql.NVarChar(200), title);
        request.input('description', sql.NVarChar(1000), description);
        request.input('startDate', sql.Date, startDate);
        request.input('startTime', sql.Time, startTime);
        request.input('endDate', sql.Date, endDate);
        request.input('endTime', sql.Time, endTime);

        // run the query 
        return request.query(sqlQueries.addEvent)

    }

    // todo move this to own file : update Event
    const updateEvent = async({
        userId,
        id,
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime
    })=> {
        const pool = await getConnection();
        const request = await pool.request();

        // pass input 
        request.input('userId', sql.VarChar(50), userId);
        request.input('id', sql.Int(50), id);
        request.input('title', sql.NVarChar(200), title);
        request.input('description', sql.NVarChar(1000), description);
        request.input('startDate', sql.Date, startDate);
        request.input('startTime', sql.Time, startTime);
        request.input('endDate', sql.Date, endDate);
        request.input('endTime', sql.Time, endTime);

        // run the query 
        return request.query(sqlQueries.updateEvent);


    }

    // todo move this to script file: delete Event
    const deleteEvent = async ({id, userId})=> {
        const pool = await getConnection();
        const request = await pool.request();

        // pass input 
        request.input('id', sql.Int, id);
        request.input('userId', sql.VarChar(50), userId);

        return request.query(sqlQueries.deleteEvent)

    }

    return {
        getEvents,
        addEvent,
        updateEvent,
        deleteEvent
    }
}

module.exports =  {register}