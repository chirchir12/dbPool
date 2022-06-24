"use strict";

const fse = require('fs-extra');
const {join } = require('path');

const loadSqlQueries = async foldername=> {
    // determine the file path for the folder
    const filePath = join(process.cwd(), 'src', 'data', foldername);

    // get list of all the files in the folder 
    const files = await fse.readdir(filePath);

    // get only the files that end in sql 
    const sqlFiles = files.filter(f=> f.endsWith('.sql'));

    // get the content of each file
    const queries = {};

    for(let i=0; i<sqlFiles.length; i++){
        const query = fse.readFileSync(join(filePath, sqlFiles[i]), {encoding:"utf-8"})
        queries[sqlFiles[i].replace(".sql", "")] = query
    }
    return queries
}

module.exports = {
    loadSqlQueries
}